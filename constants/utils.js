import { Platform, StatusBar, Dimensions } from "react-native";
import { theme } from "galio-framework";
import { put } from "@redux-saga/core/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";

import ActionAlert from "../reduxs/Alert";
import ActionLoading from "../reduxs/Loading";
import { CommonActions } from "@react-navigation/routers";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 4 + StatusHeight;
export const iPhoneX = () =>
  Platform.OS === "ios" && (height === 812 || width === 812);

export function openAlert(dispatch, title, body, txtOk, onPressOk) {
  dispatch(ActionAlert.UpdateVisibleAlert(true));
  title && dispatch(ActionAlert.UpdateTitleAlert(title));
  body && dispatch(ActionAlert.UpdateBodyAlert(body));
  txtOk && dispatch(ActionAlert.UpdateTxtokAlert(txtOk));
  onPressOk && dispatch(ActionAlert.UpdateOnpressokAlert(onPressOk));
}
export function openAlertSaga(error) {
  let arr = [];
  arr.push(put(ActionAlert.UpdateVisibleAlert(true)));
  arr.push(put(ActionAlert.UpdateBodyAlert(error)));
  return arr;
}
export function closeAlert(dispatch) {
  dispatch(ActionAlert.UpdateVisibleAlert(false));
}

export function openLoading(dispatch) {
  dispatch(ActionLoading.UpdateVisibleLoading(true));
}
export function openLoadingSaga() {
  let arr = [];
  arr.push(put(ActionLoading.UpdateVisibleLoading(true)));
  return arr;
}
export function closeLoadingSaga() {
  let arr = [];
  arr.push(put(ActionLoading.UpdateVisibleLoading(false)));
  return arr;
}
export function closeLoading(dispatch) {
  dispatch(ActionLoading.UpdateVisibleLoading(false));
}

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log("error save storage", error);
  }
};

export const removeStoreData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("error remove storage", error);
  }
};

export const validateSignin = yup.object().shape({
  username: yup
    .string()
    .matches(/^[0-9]+$/, "M?? sinh vi??n ph???i l?? s???")
    .length(10, ({ length }) => `M?? sinh vi??n ph???i c?? ????? d??i b???ng ${length}`)
    .required("Vui l??ng nh???p m?? sinh vi??n"),
  password: yup
    .string()
    .min(8, ({ min }) => `M???t kh???u ph???i c?? ??t nh???t ${min} k?? t???`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
      "M???t kh???u ph???i c?? ??t nh???t m???t ch??? c??i v?? m???t s???"
    )
    .required("Vui l??ng nh???p m???t kh???u"),
});
export const validateSignup = yup.object().shape({
  fullName: yup.string().required("Vui l??ng nh???p h??? t??n"),
  username: yup
    .string()
    .matches(/^[0-9]+$/, "M?? sinh vi??n ph???i l?? s???")
    .length(10, ({ length }) => `M?? sinh vi??n ph???i c?? ????? d??i b???ng ${length}`)
    .required("Vui l??ng nh???p m?? sinh vi??n"),
  phonenumber: yup
    .string()
    .matches(/^[0-9]+$/, "S??? ??i???n tho???i ph???i l?? s???")
    .required("Vui l??ng nh???p s??? ??i???n tho???i"),
  email: yup
    .string()
    .email("Email kh??ng h???p l???")
    .required("Vui l??ng nh???p email"),
  password: yup
    .string()
    .min(8, ({ min }) => `M???t kh???u ph???i c?? ??t nh???t ${min} k?? t???`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
      "M???t kh???u ph???i c?? ??t nh???t m???t ch??? c??i v?? m???t s???"
    )
    .required("Vui l??ng nh???p m???t kh???u"),
  re_password: yup
    .string()
    .required("Vui l??ng nh???p l???i m???t kh???u")
    .oneOf([yup.ref("password"), null], "Nh???p l???i m???t kh???u kh??ng kh???p"),
});
export const validateUserInfor = yup.object().shape({
  fullname: yup.string().required("Vui l??ng nh???p h??? t??n"),
  phonenumber: yup
    .string()
    .matches(/^[0-9]+$/, "S??? ??i???n tho???i ph???i l?? s???")
    .required("Vui l??ng nh???p s??? ??i???n tho???i"),
  email: yup
    .string()
    .email("Email kh??ng h???p l???")
    .required("Vui l??ng nh???p email"),
});

export const validateChangePassword = yup.object().shape({
  new_password: yup
    .string()
    .min(8, ({ min }) => `M???t kh???u ph???i c?? ??t nh???t ${min} k?? t???`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
      "M???t kh???u ph???i c?? ??t nh???t m???t ch??? c??i v?? m???t s???"
    )
    .required("Vui l??ng nh???p m???t kh???u"),
  re_new_password: yup
    .string()
    .required("Vui l??ng nh???p l???i m???t kh???u")
    .oneOf([yup.ref("new_password"), null], "Nh???p l???i m???t kh???u kh??ng kh???p"),
});

export const validateEmail = yup.object().shape({
  email: yup
    .string()
    .email("Email kh??ng h???p l???")
    .required("Vui l??ng nh???p email"),
});

export function resetScreen(navigation, screen) {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: screen }],
    })
  );
}
