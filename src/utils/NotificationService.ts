import { orderLoaded } from './../redux/actions/order';
// import {
//   setCall,
//   setActiveCalls,
//   setCallArrived,
// } from './../redux/actions/allActions';
/* eslint-disable */
import { AppState, Clipboard, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import requests from '../api/requests';

let store = null;

let tokenProvider = () => {
  return store.token;
};

function setState(state) {
  store = state;
}

export enum NotificationActionTypes {
  NewCall = 'new_call',
  CallCancelled = 'call_canceled',
  DriverArrived = 'call_almost_arrived',
  CallCompleted = 'call_completed',
}

let notificationConsumer = async notification => {
  console.warn(notification.data);
  switch (notification.data.actionType) {
    case "accepted": {
      try {
        let { data } = await requests.main.books('accepted');
        store.dispatch(orderLoaded({ name: 'current', data: data.data[0] }))
      } catch (error) {
        if (!error.response)
          console.warn(error);
        else {
          console.warn(error.response);
        }
      }
      return
    }
    //   case NotificationActionTypes.NewCall:
    //     requests.orders
    //       .getCalls(tokenProvider())
    //       .then(res => {
    //         store.dispatch(setActiveCalls(res.data.data));
    //       })
    //       .catch(res => {
    //         console.warn(res.response);
    //       });
    //     break;
    //   case NotificationActionTypes.CallCancelled:
    //     requests.orders
    //       .getCall(notification.data.call, tokenProvider())
    //       .then(res => {
    //         store.dispatch(setCall(res.data.data));
    //       })
    //       .catch(res => {
    //         console.warn(res.response);
    //       });
    //     break;
    //   case NotificationActionTypes.CallCompleted:
    //     requests.orders
    //       .getCall(notification.data.call, tokenProvider())
    //       .then(res => {
    //         store.dispatch(setCall(res.data.data));
    //       })
    //       .catch(res => {
    //         console.warn(res.response);
    //       });
    //     break;
    //   case NotificationActionTypes.DriverArrived:
    //     store.dispatch(setCallArrived(true));
    //     break;
    default:
      console.warn('UNHANDLED ACTION');
      console.warn(notification.data);
      break;
  }
};

function init() {
  const channel = new firebase.notifications.Android.Channel(
    'insider',
    'insider channel',
    firebase.notifications.Android.Importance.Max,
  ).setDescription('Updates');
  let channelId = firebase.notifications().android.createChannel(channel);
  checkPermission();
  createNotificationListeners(channelId);
}

const createNotificationListeners = async channelId => {
  try {
    let notifications = firebase.notifications();
    notifications.onNotification(async notification => {
      notification.android.setChannelId(channelId).setSound('default');
      firebase.notifications().displayNotification(notification);
      if (AppState.currentState.match(/active/)) {
        notificationConsumer(notification);
        clearBadge();
      }
    });
    notifications.onNotificationOpened(async notification => {
      // Process data of the notification
      console.warn(notification.notification.data);
      notificationConsumer(notification);
      clearBadge();
    });
  } catch (error) {
    console.warn(error);
  }
};

let clearBadge = () => {
  firebase.notifications().removeAllDeliveredNotifications();
};

const checkPermission = async () => {
  try {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  } catch (error) {
    console.warn(error);
  }
};
const getToken = async () => {
  try {
    let fcmToken = await firebase.messaging().getToken();
    // Clipboard.setString(fcmToken);
    // console.log(fcmToken);
    // requests.auth
    //   .setDeviceToken(tokenProvider(), fcmToken, Platform.OS)
    //   .catch(res => console.warn(res.response));
  } catch (error) {
    console.warn(error);
  }
};

const getFcmToken = async () => {
  try {
    let fcmToken = await firebase.messaging().getToken();
    return fcmToken;
  }
  catch (error) {
    return error;
  }
};

const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    getToken();
  } catch (error) {
    alert(
      'The app needs permission to send you status of your sold and purchased products!',
    );
  }
};

const backgroundPushes = async message => {
  if (AppState.currentState.match(/active/)) {
    return Promise.resolve();
  }
  const notification = new firebase.notifications.Notification()
    .setNotificationId(message.messageId)
    .setTitle(message.data.title)
    .setBody(message.data.body)
    .android.setChannelId('insider')
    .android.setPriority(firebase.notifications.Android.Priority.High)
    .setSound('default');
  await firebase.notifications().displayNotification(notification);
  return Promise.resolve();
};

export default { init, backgroundPushes, clearBadge, setState, getFcmToken };
