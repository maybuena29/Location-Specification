-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2023 at 02:56 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `locator_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('GbksIMub2EbRlav2x6dbaT5oJFvsLXhr', 1668940244, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-19T17:50:45.241Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":\"0\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `tblattributes`
--

CREATE TABLE `tblattributes` (
  `Attr_ID` bigint(30) NOT NULL,
  `Attribute_Name` varchar(300) NOT NULL,
  `total_value` bigint(30) NOT NULL,
  `AttrStatus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblattributes`
--

INSERT INTO `tblattributes` (`Attr_ID`, `Attribute_Name`, `total_value`, `AttrStatus`) VALUES
(13, 'size', 8, 'active'),
(15, 'dosage', 76, 'active'),
(30, 'Unit', 73, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblrooms`
--

CREATE TABLE `tblrooms` (
  `room_id` bigint(30) NOT NULL,
  `room_name` varchar(300) NOT NULL,
  `room_status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblrooms`
--

INSERT INTO `tblrooms` (`room_id`, `room_name`, `room_status`) VALUES
(3, 'Room A', 'active'),
(4, 'Room B', 'active'),
(5, 'Room C', 'active'),
(6, 'Room 102A', 'inactive'),
(7, 'Room 202', 'active'),
(8, 'Room 303', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblstatus`
--

CREATE TABLE `tblstatus` (
  `status_id` bigint(30) NOT NULL,
  `status_name` varchar(300) NOT NULL,
  `status_status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblstatus`
--

INSERT INTO `tblstatus` (`status_id`, `status_name`, `status_status`) VALUES
(2, 'Free', 'active'),
(3, 'Teaching', 'active'),
(4, 'Busy', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblteachers`
--

CREATE TABLE `tblteachers` (
  `teacher_id` bigint(30) NOT NULL,
  `teacher_username` varchar(300) NOT NULL,
  `teacher_password` varchar(300) NOT NULL,
  `teacher_image` varchar(300) DEFAULT NULL,
  `teacher_name` varchar(600) NOT NULL,
  `location` bigint(30) NOT NULL,
  `status` bigint(30) NOT NULL,
  `currentStatus` varchar(300) NOT NULL,
  `acc_status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblteachers`
--

INSERT INTO `tblteachers` (`teacher_id`, `teacher_username`, `teacher_password`, `teacher_image`, `teacher_name`, `location`, `status`, `currentStatus`, `acc_status`) VALUES
(1, 'teacher', '$2a$10$0D2rSiUbJ9qg0V43Qd4Jy.igtyPQQX.g7rLIcphdwDficafRCWnum', '', 'Test Account', 8, 2, 'online', 'active'),
(2, 'teacher a', '$2a$10$E3bePrc5e3p.VYM2FQjuJ.LjL4HdvI3H8pPyXsIHMGXKEqVcWPp.G', '', 'teacher A', 3, 2, 'offline', 'active'),
(3, 'teacher b', '$2a$10$xmmTsYm6pz4yGIIF8elP/uJYvueRt3YqAgT6hn7V0yfFMZu8DwvMW', '', 'Teacher B', 4, 3, 'online', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblusermodules`
--

CREATE TABLE `tblusermodules` (
  `moduleID` int(11) NOT NULL,
  `userRoleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblusermodules`
--

INSERT INTO `tblusermodules` (`moduleID`, `userRoleID`) VALUES
(8, 0),
(15, 0),
(11, 0),
(10, 0),
(14, 0),
(13, 0),
(12, 0),
(9, 0),
(7, 0),
(6, 0),
(5, 0),
(3, 0),
(2, 0),
(1, 0),
(4, 0),
(0, 0),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tblusermoduleslist`
--

CREATE TABLE `tblusermoduleslist` (
  `moduleListID` int(11) NOT NULL,
  `moduleName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblusermoduleslist`
--

INSERT INTO `tblusermoduleslist` (`moduleListID`, `moduleName`) VALUES
(1, 'Masterlist (Product)'),
(2, 'Attributes (Product)'),
(3, 'Brand (Product)'),
(4, 'Category (Product)'),
(5, 'Inventory'),
(6, 'Supplier'),
(7, 'Purchase Order (Supplier Transaction)'),
(8, 'Goods Receipt PO (Supplier Transaction)'),
(9, 'A/P Invoice'),
(10, 'Orders (POS)'),
(11, 'Generate Orders (POS)'),
(12, 'Transaction History (POS)'),
(13, 'Payments (POS)'),
(14, 'Discount (Adjustments)'),
(15, 'Critical Level (Adjustments)');

-- --------------------------------------------------------

--
-- Table structure for table `tbluserroles`
--

CREATE TABLE `tbluserroles` (
  `userRoleID` int(11) NOT NULL,
  `userRolename` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbluserroles`
--

INSERT INTO `tbluserroles` (`userRoleID`, `userRolename`) VALUES
(0, 'Admin'),
(2, 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `userID` int(11) NOT NULL,
  `userUsername` varchar(45) NOT NULL,
  `userPassword` varchar(500) NOT NULL,
  `userRoleID` int(11) NOT NULL,
  `userName` varchar(45) NOT NULL,
  `userContact` varchar(45) NOT NULL,
  `userAddress` varchar(45) NOT NULL,
  `userStatus` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblusers`
--

INSERT INTO `tblusers` (`userID`, `userUsername`, `userPassword`, `userRoleID`, `userName`, `userContact`, `userAddress`, `userStatus`) VALUES
(1, 'Admin1', '$2a$10$7qMJM.TyQSAGzuUTVV/0QOGbgFtUiXWvDKOqyz5uCdvBEThgCuBSW', 0, 'Admin', '0', '1', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `user_sessions`
--

CREATE TABLE `user_sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `tblattributes`
--
ALTER TABLE `tblattributes`
  ADD PRIMARY KEY (`Attr_ID`),
  ADD UNIQUE KEY `Attribute_Name` (`Attribute_Name`);

--
-- Indexes for table `tblrooms`
--
ALTER TABLE `tblrooms`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `tblstatus`
--
ALTER TABLE `tblstatus`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `tblteachers`
--
ALTER TABLE `tblteachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD KEY `teacher_room` (`location`),
  ADD KEY `teacher_status` (`status`);

--
-- Indexes for table `tblusermodules`
--
ALTER TABLE `tblusermodules`
  ADD KEY `userRoleID_idx` (`userRoleID`);

--
-- Indexes for table `tblusermoduleslist`
--
ALTER TABLE `tblusermoduleslist`
  ADD PRIMARY KEY (`moduleListID`);

--
-- Indexes for table `tbluserroles`
--
ALTER TABLE `tbluserroles`
  ADD PRIMARY KEY (`userRoleID`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userUsername_UNIQUE` (`userUsername`),
  ADD KEY `userRoleID_idx` (`userRoleID`);

--
-- Indexes for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblattributes`
--
ALTER TABLE `tblattributes`
  MODIFY `Attr_ID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `tblrooms`
--
ALTER TABLE `tblrooms`
  MODIFY `room_id` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tblstatus`
--
ALTER TABLE `tblstatus`
  MODIFY `status_id` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tblteachers`
--
ALTER TABLE `tblteachers`
  MODIFY `teacher_id` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tblusermoduleslist`
--
ALTER TABLE `tblusermoduleslist`
  MODIFY `moduleListID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbluserroles`
--
ALTER TABLE `tbluserroles`
  MODIFY `userRoleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblteachers`
--
ALTER TABLE `tblteachers`
  ADD CONSTRAINT `teacher_room` FOREIGN KEY (`location`) REFERENCES `tblrooms` (`room_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_status` FOREIGN KEY (`status`) REFERENCES `tblstatus` (`status_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tblusermodules`
--
ALTER TABLE `tblusermodules`
  ADD CONSTRAINT `userRoleIDModule` FOREIGN KEY (`userRoleID`) REFERENCES `tbluserroles` (`userRoleID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD CONSTRAINT `tblusers_ibfk_1` FOREIGN KEY (`userRoleID`) REFERENCES `tbluserroles` (`userRoleID`),
  ADD CONSTRAINT `userRoleID` FOREIGN KEY (`userRoleID`) REFERENCES `tbluserroles` (`userRoleID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
