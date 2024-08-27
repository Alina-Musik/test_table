// src/components/UserModal.js

import React from "react";
import Modal from "react-modal";

const UserModal = ({ user, onClose }) => {
  return (
    <Modal isOpen onRequestClose={onClose}>
      <h2>Детали пользователя</h2>
      <p>ФИО: {`${user.firstName} ${user.lastName}`}</p>
      <p>Возраст: {user.age}</p>
      <p>Адрес: {`${user.address.city}, ${user.address.address}`}</p>
      <p>Рост: {user.height}</p>
      <p>Вес: {user.weight}</p>
      <p>Телефон: {user.phone}</p>
      <p>Email: {user.email}</p>
      <button onClick={onClose}>Закрыть</button>
    </Modal>
  );
};

export default UserModal;
