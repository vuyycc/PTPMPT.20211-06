-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 27, 2021 lúc 03:02 PM
-- Phiên bản máy phục vụ: 10.4.16-MariaDB
-- Phiên bản PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `caro`
--

CREATE DATABASE IF NOT EXISTS `carodb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `carodb`;
-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `board`
--

CREATE TABLE `board` (
  `boardId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0-Playing\n1-Finished',
  `finishedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `hostname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `guestname` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `winner` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cups` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chat`
--

CREATE TABLE `chat` (
  `chatId` int(11) NOT NULL,
  `sender` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `boardId` int(11) NOT NULL,
  `message` text COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fullname` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `externalId` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT 0 COMMENT '0 - inactive\n1 - active\n2 - locked',
  `role` int(11) DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `total` int(11) DEFAULT 0,
  `wins` int(11) DEFAULT 0,
  `cups` int(11) DEFAULT 100
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`boardId`),
  ADD KEY `fk_board_user_idx` (`hostname`),
  ADD KEY `fk_board_user1_idx` (`guestname`),
  ADD KEY `fk_board_user2_idx` (`winner`);

--
-- Chỉ mục cho bảng `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chatId`),
  ADD KEY `fk_chat_user1_idx` (`sender`),
  ADD KEY `fk_chat_board1_idx` (`boardId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`,`username`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `externalId_UNIQUE` (`externalId`);
ALTER TABLE `user` ADD FULLTEXT KEY `fullname` (`fullname`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `board`
--
ALTER TABLE `board`
  MODIFY `boardId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `chat`
--
ALTER TABLE `chat`
  MODIFY `chatId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `board`
--
ALTER TABLE `board`
  ADD CONSTRAINT `fk_board_user` FOREIGN KEY (`hostname`) REFERENCES `user` (`username`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_board_user1` FOREIGN KEY (`guestname`) REFERENCES `user` (`username`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_board_user2` FOREIGN KEY (`winner`) REFERENCES `user` (`username`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_chat_board1` FOREIGN KEY (`boardId`) REFERENCES `board` (`boardId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_chat_user1` FOREIGN KEY (`sender`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
