import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./CheckInformation.scss";
import { Empty } from "antd";
import { message } from "antd";
import { publicRequest, userRequest } from "../../requestMethods";
import { useAuthUser } from "react-auth-kit";

export const CheckInformation = ({ isAllowed }) => {
  const [scanResult, setScanResult] = useState(null);
  const [infoToShow, setInfoToShow] = useState(null);
  const [validTime, setValidTime] = useState(false);
  const authUser = useAuthUser();
  const gateId = authUser().gate;
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      try {
        decryptInformation(result);
      } catch (error) {
        console.log(error);
        message.error("Mã QR không hợp lệ");
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);
  useEffect(() => {
    if (scanResult) {
      checkExpiration();
    }
  }, [scanResult]);
  useEffect(() => {
    if (isAllowed && validTime) {
      if (scanResult.visitorRequest) {
        addEntryExit(scanResult.visitorName, scanResult.visitorRequest);
      } else {
        addEntryExit(scanResult.userName, scanResult.visitorRequest);
      }
    }
  }, [isAllowed]);
  const addEntryExit = async (name, visit) => {
    try {
      const res = await userRequest.post("/entryExit", {
        userName: name,
        visitorRequest: visit,
        gateId: gateId,
      });
      if (res.data.type === "success") {
        return message.success("Cho phép thành công");
      } else {
        console.log(res.data.message);
        return message.error("Cho phép không thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function convertToJSON(inputString) {
    const str1 = "QrInformation(userName=";
    const str2 = ", userPhone=";
    const str3 = ", destination=";
    const str4 = ", visitorRequest=";
    const str5 = ", task=";
    const str6 = ", visitorName=";
    const str7 = ", createAt=";
    const str8 = ", expireAt=";
    const indexOfFirstPhone = inputString.indexOf(str2);
    const indexOfFirstDes = inputString.indexOf(str3);
    const indexOfFirstReq = inputString.indexOf(str4);
    const indexOfFirstTask = inputString.indexOf(str5);
    const indexOfVisitorName = inputString.indexOf(str6);
    const indexOfCreate = inputString.indexOf(str7);
    const indexOfExpire = inputString.indexOf(str8);
    const userName = inputString.substring(str1.length, indexOfFirstPhone);
    const userPhone = inputString.substring(
      indexOfFirstPhone + str2.length,
      indexOfFirstDes
    );
    const destination = inputString.substring(
      indexOfFirstDes + str3.length,
      indexOfFirstReq
    );
    const visitorRequest = inputString.substring(
      indexOfFirstReq + str4.length,
      indexOfFirstTask
    );
    const task = inputString.substring(
      indexOfFirstTask + str5.length,
      indexOfVisitorName
    );
    const visitorName = inputString.substring(
      indexOfVisitorName + str6.length,
      indexOfCreate
    );
    const createAt = inputString.substring(
      indexOfCreate + str7.length,
      indexOfExpire
    );
    const expireAt = inputString.substring(
      indexOfExpire + str8.length,
      inputString.length - 1
    );
    var myJsonObject = {
      userName: userName,
      userPhone: userPhone,
      destination: destination,
      visitorRequest: visitorRequest === "true",
      task: task,
      visitorName: visitorName,
      createAt: parseDateTimeString(createAt), // Replace with the actual creation time in ISO format
      expireAt: parseDateTimeString(expireAt), // Replace with the actual expiration time in ISO format
    };
    return myJsonObject;
  }

  function parseDateTimeString(dateTimeString) {
    // Tạo một đối tượng Date từ chuỗi đầu vào
    var dateObject = new Date(dateTimeString);

    // Kiểm tra xem đối tượng Date có hợp lệ không
    if (isNaN(dateObject.getTime())) {
      return "Invalid Date";
    } else {
      // Trích xuất thông tin về ngày, giờ, phút, và giây
      var year = dateObject.getFullYear();
      var month = dateObject.getMonth() + 1; // Tháng trong đối tượng Date bắt đầu từ 0
      var day = dateObject.getDate();
      var hours = dateObject.getHours();
      var minutes = dateObject.getMinutes();
      var seconds = dateObject.getSeconds();

      // Tạo một chuỗi đại diện cho ngày giờ phút
      var formattedDateTime =
        year +
        "-" +
        pad(month) +
        "-" +
        pad(day) +
        " " +
        pad(hours) +
        ":" +
        pad(minutes) +
        ":" +
        pad(seconds);

      return formattedDateTime;
    }
  }

  // Hàm hỗ trợ để thêm số 0 vào trước các số từ 1 đến 9
  function pad(number) {
    return number < 10 ? "0" + number : number;
  }

  const decryptInformation = async (result) => {
    try {
      const res = await userRequest.get(
        `/encrypt/dec?encryptedString=${result}`
      );
      if (res.data.type === "success") {
        try {
          setScanResult(convertToJSON(res.data.data));
        } catch (e) {
          message.error("Mã QR không hợp lệ");
          console.log(e);
        }
        return true;
      } else {
        return message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkExpiration = () => {
    const now = new Date();
    const expireAt = new Date(scanResult.expireAt);

    if (expireAt < now) {
      message.error("Qr code đã hết hạn");
      setValidTime(false);
      setInfoToShow(null);
      return;
    }
    setValidTime(true);
    if (scanResult.visitorRequest) {
      setInfoToShow(
        <div className="information">
          <p>
            <b>Tên người tạo:</b> {scanResult.userName}
          </p>
          <p>
            <b>Số điện thoại người tạo:</b> {scanResult.userPhone}
          </p>
          <p>
            <b>Tên khách:</b> {scanResult.visitorName}
          </p>
          <p>
            <b>Lý do đến:</b> {scanResult.task}
          </p>
          <p>
            <b>Điểm đến:</b> {scanResult.destination}
          </p>
          <p>
            <b>Thời điểm tạo Qrcode:</b> {scanResult.createAt}
          </p>
          <p>
            <b>Thời điểm hết hạn Qrcode:</b> {scanResult.expireAt}
          </p>
        </div>
      );
    } else {
      setInfoToShow(
        <div className="information">
          <p>
            <b>Tên:</b> {scanResult.userName}
          </p>
          <p>
            <b>Số điện thoại:</b> {scanResult.userPhone}
          </p>
          <p>
            <b>Nơi ở:</b> {scanResult.destination}
          </p>
          <p>
            <b>Thời điểm tạo Qrcode:</b> {scanResult.createAt}
          </p>
          <p>
            <b>Thời điểm hết hạn Qrcode:</b> {scanResult.expireAt}
          </p>
        </div>
      );
    }
  };

  return (
    <div className="checkInfoContainer">
      <div className="qrCode">
        <div id="reader"></div>
      </div>
      <div className="divider"></div>
      {infoToShow ? infoToShow : <Empty />}
    </div>
  );
};
