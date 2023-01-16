-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2022 at 06:48 PM
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
-- Database: `ordering_pos_db`
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
-- Table structure for table `tblapinvoice`
--

CREATE TABLE `tblapinvoice` (
  `invoiceID` bigint(30) NOT NULL,
  `invoiceNumber` varchar(300) NOT NULL,
  `totalNetPrice` decimal(10,2) NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `GRNumber` varchar(300) NOT NULL,
  `invoiceDate` date NOT NULL,
  `paymentMode` varchar(300) NOT NULL,
  `Remarks` varchar(300) NOT NULL,
  `Status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblapinvoice`
--

INSERT INTO `tblapinvoice` (`invoiceID`, `invoiceNumber`, `totalNetPrice`, `totalAmount`, `GRNumber`, `invoiceDate`, `paymentMode`, `Remarks`, `Status`) VALUES
(6, 'Invoice_907558', '250.00', '250.00', 'GR_317793', '2022-11-11', 'cash', 'Based on PO_648040. Based on GR_317793', 'success'),
(7, 'Invoice_594361', '325.00', '325.00', 'GR_237163', '2022-11-11', 'cash', 'Based on PO_648040. From back order.. Based on GR_237163', 'success'),
(8, 'Invoice_570699', '1058.00', '1058.00', 'GR_728136', '2022-11-23', 'cash', 'Based on PO_153202. Based on GR_728136', 'success'),
(9, 'Invoice_273679', '874.00', '874.00', 'GR_707106', '2022-11-30', 'cash', 'Based on PO_372241. Based on GR_707106', 'success');

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
-- Table structure for table `tblattributesvalue`
--

CREATE TABLE `tblattributesvalue` (
  `Value_ID` bigint(30) NOT NULL,
  `Value_Name` varchar(300) NOT NULL,
  `Attr_Parent_ID` bigint(30) NOT NULL,
  `ValStatus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblattributesvalue`
--

INSERT INTO `tblattributesvalue` (`Value_ID`, `Value_Name`, `Attr_Parent_ID`, `ValStatus`) VALUES
(21, 'small', 13, 'active'),
(27, 'medium', 13, 'active'),
(28, 'Large', 13, 'active'),
(30, '30mg', 15, 'active'),
(31, '100mg', 15, 'active'),
(32, '300mg', 15, 'active'),
(33, '600mg', 15, 'active'),
(34, '15mg/60ml', 15, 'active'),
(35, '75mg', 15, 'active'),
(36, '15ml', 15, 'active'),
(41, 'Newborn', 13, 'active'),
(44, '5mg', 15, 'active'),
(45, '10mg', 15, 'active'),
(47, 'Extra Large', 13, 'active'),
(52, '135ml', 30, 'active'),
(54, '75ml', 30, 'active'),
(57, '100ml', 30, 'active'),
(59, '10g', 30, 'active'),
(68, '225ml', 30, 'active'),
(77, '125mg/60ml', 15, 'active'),
(78, '500mg', 15, 'active'),
(81, '250mg/60ml', 15, 'active'),
(83, '1pc', 30, 'active'),
(84, '120ml', 15, 'active'),
(86, '20mg', 15, 'active'),
(88, '80mg', 15, 'active'),
(93, '40mg', 15, 'active'),
(94, '16mg', 15, 'active'),
(98, '24mg', 15, 'active'),
(100, '200mg', 15, 'active'),
(102, '100mg/60ml', 15, 'active'),
(104, '25mg', 15, 'active'),
(106, '6.25mg', 15, 'active'),
(114, '70ml', 15, 'active'),
(116, '400mg', 15, 'active'),
(117, '60ml', 15, 'active'),
(124, '1g', 15, 'active'),
(127, '75mcg', 15, 'active'),
(129, '457mg', 15, 'active'),
(130, '625mg', 15, 'active'),
(131, '312mg', 15, 'active'),
(132, '400/80mg', 15, 'active'),
(133, '50mg', 15, 'active'),
(135, '240mg/60ml', 15, 'active'),
(136, '800/160mg', 15, 'active'),
(137, '500mcg', 15, 'active'),
(141, '250mcg', 15, 'active'),
(149, '325mg', 15, 'active'),
(154, '120mg', 15, 'active'),
(159, '60mg', 15, 'active'),
(160, '3mg', 15, 'active'),
(161, '4mg', 15, 'active'),
(168, '150mg', 15, 'active'),
(180, '50mcg', 15, 'active'),
(182, '2mg', 15, 'active'),
(184, '5mg/50mg', 15, 'active'),
(185, '50mg/12.5mg', 15, 'active'),
(186, '100mmg/25mg', 15, 'active'),
(194, '15mg', 15, 'active'),
(215, '325mg/37.5mg', 15, 'active'),
(217, '100mg/15ml', 15, 'active'),
(218, '10mEq', 15, 'active'),
(234, '100mcg', 15, 'active'),
(235, '1mg/1ml', 15, 'active'),
(249, '35mg', 15, 'active'),
(252, '300mg/100mg/100mcg', 15, 'active'),
(253, '100mg/10mg/50mcg', 15, 'active'),
(255, '1pcs', 30, 'active'),
(275, '25ml', 30, 'active'),
(276, '50ml', 30, 'active'),
(283, '5g', 30, 'active'),
(285, '15g', 30, 'active'),
(309, '4ml', 30, 'active'),
(311, '30g', 30, 'active'),
(314, '35ml', 30, 'active'),
(315, '10ml', 30, 'active'),
(323, '30ml', 30, 'active'),
(324, '25g', 30, 'active'),
(325, '50g', 30, 'active'),
(331, '8pcs', 30, 'active'),
(332, '2pcs', 30, 'active'),
(347, '45g', 30, 'active'),
(349, '20g', 30, 'active'),
(350, '8g', 30, 'active'),
(356, '300g', 30, 'active'),
(357, '600g', 30, 'active'),
(358, '180g', 30, 'active'),
(359, '375g', 30, 'active'),
(360, '700g', 30, 'active'),
(361, '150g', 30, 'active'),
(362, '350g', 30, 'active'),
(364, '320g', 30, 'active'),
(366, '420g', 30, 'active'),
(373, '120g', 30, 'active'),
(401, 'XX Large', 13, 'active'),
(405, 'XXX Large', 13, 'active'),
(416, '340g', 30, 'active'),
(417, '135g', 30, 'active'),
(423, '400g', 30, 'active'),
(424, '1.6kg', 30, 'active'),
(428, 'Large-Extra Large', 13, 'active'),
(449, '200mg/325mg', 15, 'active'),
(464, '50mg/5mg', 15, 'active'),
(466, '90mg', 15, 'active'),
(483, '120mg/60ml', 15, 'active'),
(486, '250/60ml', 15, 'active'),
(487, '120/60ml', 15, 'active'),
(497, '250ml', 15, 'active'),
(501, '30pcs', 15, 'active'),
(510, '10mg/500mcg', 15, 'active'),
(511, '10mg/5mg', 15, 'active'),
(539, '550mg', 15, 'active'),
(576, '250mg', 15, 'active'),
(592, '240ml', 15, 'active'),
(601, '1000mg', 15, 'active'),
(630, '220mg', 15, 'active'),
(640, '200mg/60ml', 15, 'active'),
(646, '120/120ml', 15, 'active'),
(648, '250mg/120ml', 15, 'active'),
(660, '65mg', 15, 'active'),
(661, '54ml', 15, 'active'),
(688, '7.5ml', 30, 'active'),
(690, '8oz', 30, 'active'),
(693, '8ml', 30, 'active'),
(694, '500ml', 30, 'active'),
(697, '2x132g', 30, 'active'),
(698, '2x195g', 30, 'active'),
(699, '150ml', 30, 'active'),
(704, '145ml', 30, 'active'),
(705, '95ml', 30, 'active'),
(710, '40g', 30, 'active'),
(733, '24pcs', 30, 'active'),
(736, '80g', 30, 'active'),
(738, '4pcs', 30, 'active'),
(750, '40ml', 30, 'active'),
(751, '300ml', 30, 'active'),
(754, '150pcs', 30, 'active'),
(755, '50pcs', 30, 'active'),
(756, '108pcs', 30, 'active'),
(757, '14g', 30, 'active'),
(760, '200pcs', 30, 'active'),
(761, '72pcs', 30, 'active'),
(773, '6ml', 30, 'active'),
(775, '3.5ml', 30, 'active'),
(778, '200ml', 30, 'active'),
(780, '125ml', 30, 'active'),
(785, '200g', 30, 'active'),
(792, '100g', 30, 'active'),
(805, '9oz', 30, 'active'),
(815, '79ml', 30, 'active'),
(862, '7.5g', 30, 'active'),
(868, '5ml', 30, 'active'),
(872, '12g', 30, 'active'),
(893, '6g', 30, 'active'),
(896, '3ml', 30, 'active'),
(918, '7g', 30, 'active'),
(926, '80pcs', 30, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblauditlog`
--

CREATE TABLE `tblauditlog` (
  `AuditID` int(11) NOT NULL,
  `AuditUserCode` varchar(500) NOT NULL,
  `AuditDate` date NOT NULL,
  `AuditTime` varchar(500) NOT NULL,
  `AuditModule` varchar(500) NOT NULL,
  `AuditAction` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblauditlog`
--

INSERT INTO `tblauditlog` (`AuditID`, `AuditUserCode`, `AuditDate`, `AuditTime`, `AuditModule`, `AuditAction`) VALUES
(1934, '1', '2022-11-03', '22:18:20', 'Login', 'Logged In User: Admin1'),
(1935, '1', '2022-11-03', '22:18:20', 'Inventory-Stocks', 'Visit'),
(1936, '1', '2022-11-03', '22:18:25', 'Inventory-Stocks', 'Visit'),
(1937, '1', '2022-11-03', '22:18:27', 'Product-Masterlist', 'Visit'),
(1938, '1', '2022-11-03', '22:19:29', 'Product-Category', 'Visit'),
(1939, '1', '2022-11-03', '22:20:48', 'Product-Attributes', 'Visit'),
(1940, '1', '2022-11-03', '22:20:48', 'Product-Attributes', 'Visit'),
(1941, '1', '2022-11-03', '22:20:49', 'Product-Masterlist', 'Visit'),
(1942, '1', '2022-11-03', '22:20:50', 'Product-Brand', 'Visit'),
(1943, '1', '2022-11-03', '22:20:51', 'Product-Category', 'Visit'),
(1944, '1', '2022-11-03', '22:20:53', 'Inventory-Stocks', 'Visit'),
(1945, '1', '2022-11-03', '22:21:02', 'POS-Order', 'Visit'),
(1946, '1', '2022-11-03', '22:21:36', 'Adjustment-Discounts ', 'Visit'),
(1947, '1', '2022-11-03', '22:21:40', 'POS-Order', 'Visit'),
(1948, '1', '2022-11-03', '22:21:41', 'POS-Order', 'Visit'),
(1949, '1', '2022-11-03', '22:21:52', 'Inventory-Stocks', 'Visit'),
(1950, '1', '2022-11-03', '22:22:37', 'POS-Order', 'Visit'),
(1951, '1', '2022-11-03', '22:22:43', 'Adjustment-Discounts ', 'Visit'),
(1952, '1', '2022-11-03', '22:24:43', 'Adjustment-Discounts ', 'Visit'),
(1953, '1', '2022-11-03', '22:24:52', 'POS-Order', 'Visit'),
(1954, '1', '2022-11-03', '22:25:08', 'POS-Order', 'Visit'),
(1955, '1', '2022-11-03', '22:27:43', 'POS-Order', 'Visit'),
(1956, '1', '2022-11-03', '22:27:44', 'POS-Order', 'Visit'),
(1957, '1', '2022-11-03', '22:29:31', 'Logout', 'Logged Out User: Admin1'),
(1958, '1', '2022-11-03', '22:29:35', 'Login', 'Logged In User: Admin1'),
(1959, '1', '2022-11-03', '22:29:36', 'Inventory-Stocks', 'Visit'),
(1960, '1', '2022-11-03', '22:29:40', 'Inventory-Stocks', 'Visit'),
(1961, '1', '2022-11-03', '22:29:41', 'Product-Masterlist', 'Visit'),
(1962, '1', '2022-11-03', '22:29:58', 'Adjustment-Discounts ', 'Visit'),
(1963, '1', '2022-11-03', '22:31:24', 'Company', 'Visit'),
(1964, '1', '2022-11-03', '22:32:24', 'Company', 'Visit'),
(1965, '1', '2022-11-03', '22:32:24', 'POS-Order', 'Visit'),
(1966, '1', '2022-11-03', '22:32:55', 'Company', 'Visit'),
(1967, '1', '2022-11-03', '22:32:58', 'Company-FAQ', 'Deleted FAQ: undefined (17)'),
(1968, '1', '2022-11-03', '22:33:57', 'Company-FAQ', 'Deleted FAQ: undefined (13)'),
(1969, '1', '2022-11-03', '22:34:15', 'Company-FAQ', 'Inserted FAQ: Another Question 2'),
(1970, '1', '2022-11-03', '22:34:15', 'Company', 'Visit'),
(1971, '1', '2022-11-03', '22:34:17', 'Company-FAQ', 'Deleted FAQ: undefined (19)'),
(1972, '1', '2022-11-03', '22:34:38', 'Company-FAQ', 'Inserted FAQ: s'),
(1973, '1', '2022-11-03', '22:34:38', 'Company', 'Visit'),
(1974, '1', '2022-11-03', '22:34:40', 'Company-FAQ', 'Deleted FAQ: undefined (20)'),
(1975, '1', '2022-11-03', '22:35:34', 'Company-FAQ', 'Inserted FAQ: Another Question 2'),
(1976, '1', '2022-11-03', '22:35:34', 'Company', 'Visit'),
(1977, '1', '2022-11-03', '22:35:36', 'Company-FAQ', 'Deleted FAQ: undefined (21)'),
(1978, '1', '2022-11-03', '22:36:21', 'Company-FAQ', 'Inserted FAQ: d'),
(1979, '1', '2022-11-03', '22:36:21', 'Company', 'Visit'),
(1980, '1', '2022-11-03', '22:36:22', 'Company-FAQ', 'Deleted FAQ: undefined (22)'),
(1981, '1', '2022-11-03', '22:36:58', 'Company-FAQ', 'Inserted FAQ: dq'),
(1982, '1', '2022-11-03', '22:36:58', 'Company', 'Visit'),
(1983, '1', '2022-11-03', '22:37:40', 'Company-FAQ', 'Deleted FAQ: undefined (23)'),
(1984, '1', '2022-11-03', '22:38:51', 'Company-FAQ', 'Inserted FAQ: 12'),
(1985, '1', '2022-11-03', '22:38:52', 'Company', 'Visit'),
(1986, '1', '2022-11-03', '22:38:54', 'Company-FAQ', 'Deleted FAQ: [object Object] (24)'),
(1987, '1', '2022-11-03', '22:39:05', 'Company-FAQ', 'Deleted FAQ: undefined (24)'),
(1988, '1', '2022-11-03', '22:39:36', 'Company-FAQ', 'Inserted FAQ: asdasd'),
(1989, '1', '2022-11-03', '22:39:36', 'Company', 'Visit'),
(1990, '1', '2022-11-03', '22:39:38', 'Company-FAQ', 'Deleted FAQ: asdasd (25)'),
(1991, '1', '2022-11-03', '22:41:16', 'Login', 'Logged In User: Admin1'),
(1992, '1', '2022-11-03', '22:41:17', 'Inventory-Stocks', 'Visit'),
(1993, '1', '2022-11-03', '22:41:24', 'Inventory-Stocks', 'Visit'),
(1994, '1', '2022-11-03', '22:41:25', 'Company', 'Visit'),
(1995, '1', '2022-11-03', '22:41:32', 'Company-FAQ', 'Inserted FAQ: asdasd'),
(1996, '1', '2022-11-03', '22:41:32', 'Company', 'Visit'),
(1997, '1', '2022-11-03', '22:41:40', 'Company-FAQ', 'Deleted FAQ: asdasd (26)'),
(1998, '1', '2022-11-05', '21:04:12', 'Login', 'Logged In User: Admin1'),
(1999, '1', '2022-11-05', '21:04:12', 'Inventory-Stocks', 'Visit'),
(2000, '1', '2022-11-05', '21:04:19', 'Inventory-Stocks', 'Visit'),
(2001, '1', '2022-11-05', '21:04:21', 'Inventory-Stocks', 'Visit'),
(2002, '1', '2022-11-05', '21:44:32', 'Supplier', 'New Supplier: Test Company '),
(2003, '1', '2022-11-05', '21:44:59', 'Supplier', 'Deleted Supplier: Test Company '),
(2004, '1', '2022-11-05', '21:45:25', 'Adjustment-Discounts ', 'Visit'),
(2005, '1', '2022-11-05', '21:45:27', 'Adjustment-Discounts ', 'Visit'),
(2006, '1', '2022-11-05', '21:45:33', 'Product-Masterlist', 'Visit'),
(2007, '1', '2022-11-05', '22:01:18', 'Product-Masterlist', 'Import from Excel: 0/0'),
(2008, '1', '2022-11-05', '22:16:09', 'Product-Masterlist', 'Import from Excel: 0/0'),
(2009, '1', '2022-11-05', '22:16:09', 'Inventory-Stocks', 'Visit'),
(2010, '1', '2022-11-05', '22:16:22', 'Product-Masterlist', 'Visit'),
(2011, '1', '2022-11-05', '22:17:18', 'Product-Masterlist', 'Visit'),
(2012, '1', '2022-11-05', '22:18:38', 'Product-Masterlist', 'Import from Excel: 0/0'),
(2013, '1', '2022-11-05', '22:34:47', 'Inventory-Stocks', 'Visit'),
(2014, '1', '2022-11-05', '22:39:24', 'Inventory-Stocks', 'Visit'),
(2015, '1', '2022-11-05', '23:14:34', 'Product-Masterlist', 'Visit'),
(2016, '1', '2022-11-06', '00:47:46', 'Inventory-Stocks', 'Visit'),
(2017, '1', '2022-11-06', '00:53:43', 'Company', 'Visit'),
(2018, '1', '2022-11-06', '00:53:55', 'Inventory-Stocks', 'Visit'),
(2019, '1', '2022-11-06', '00:54:05', 'Company', 'Visit'),
(2020, '1', '2022-11-06', '00:54:05', 'POS-Order', 'Visit'),
(2021, '1', '2022-11-06', '00:54:07', 'Inventory-Stocks', 'Visit'),
(2022, '1', '2022-11-06', '00:54:11', 'Product-Masterlist', 'Visit'),
(2023, '1', '2022-11-06', '01:23:25', 'Company', 'Visit'),
(2024, '1', '2022-11-06', '01:23:25', 'POS-Order', 'Visit'),
(2025, '1', '2022-11-06', '01:23:28', 'Product-Masterlist', 'Visit'),
(2026, '1', '2022-11-06', '01:23:37', 'Adjustment-Discounts ', 'Visit'),
(2027, '1', '2022-11-06', '01:24:49', 'Inventory-Stocks', 'Visit'),
(2028, '1', '2022-11-06', '01:24:59', 'Inventory-Stocks', 'Visit'),
(2029, '1', '2022-11-06', '01:41:30', 'Company', 'Visit'),
(2030, '1', '2022-11-06', '01:42:25', 'Company', 'Visit'),
(2031, '1', '2022-11-06', '01:43:08', 'Company', 'Visit'),
(2032, '1', '2022-11-06', '01:44:27', 'Company', 'Visit'),
(2033, '1', '2022-11-06', '01:44:34', 'Company', 'Visit'),
(2034, '1', '2022-11-06', '01:44:40', 'Company', 'Visit'),
(2035, '1', '2022-11-06', '01:44:48', 'Company', 'Visit'),
(2036, '1', '2022-11-06', '01:47:20', 'Company', 'Visit'),
(2037, '1', '2022-11-06', '01:48:50', 'Company', 'Visit'),
(2038, '1', '2022-11-06', '01:49:52', 'Company', 'Visit'),
(2039, '1', '2022-11-06', '01:50:00', 'Company', 'Visit'),
(2040, '1', '2022-11-06', '01:50:08', 'Company', 'Visit'),
(2041, '1', '2022-11-06', '01:55:17', 'Company', 'Visit'),
(2042, '1', '2022-11-06', '02:00:10', 'Company', 'Visit'),
(2043, '1', '2022-11-06', '02:00:22', 'Company', 'Visit'),
(2044, '1', '2022-11-06', '02:00:35', 'Company', 'Visit'),
(2045, '1', '2022-11-06', '02:00:48', 'Company', 'Visit'),
(2046, '1', '2022-11-06', '02:04:10', 'Company', 'Visit'),
(2047, '1', '2022-11-06', '02:04:32', 'Company', 'Visit'),
(2048, '1', '2022-11-07', '01:07:39', 'Login', 'Logged In User: Admin1'),
(2049, '1', '2022-11-07', '01:07:39', 'Inventory-Stocks', 'Visit'),
(2050, '1', '2022-11-07', '01:07:49', 'Inventory-Stocks', 'Visit'),
(2051, '1', '2022-11-07', '01:09:58', 'Product-Masterlist', 'Visit'),
(2052, '1', '2022-11-07', '01:10:24', 'Product-Attributes', 'Visit'),
(2053, '1', '2022-11-07', '01:10:25', 'Product-Attributes', 'Visit'),
(2054, '1', '2022-11-07', '01:10:29', 'Product-AttributesValue', 'Viewed Attribute Value: upd an Attribute (2749)'),
(2055, '1', '2022-11-07', '01:10:34', 'Product-AttributesValue', 'Inserted Attribute Value: test to upd an Attribute (2749)'),
(2056, '1', '2022-11-07', '01:10:34', 'Product-AttributesValue', 'Viewed Attribute Value: upd an Attribute (2749)'),
(2057, '1', '2022-11-07', '01:19:32', 'Product-Masterlist', 'Visit'),
(2058, '1', '2022-11-07', '01:19:46', 'Product-Attributes', 'Visit'),
(2059, '1', '2022-11-07', '01:19:46', 'Product-Attributes', 'Visit'),
(2060, '1', '2022-11-07', '01:21:40', 'Product-Masterlist', 'Visit'),
(2061, '1', '2022-11-07', '01:25:22', 'Product-AttributesValue', 'Inserted Attribute Value: test to upd an Attribute (2749)'),
(2062, '1', '2022-11-07', '01:27:08', 'Product-Attributes', 'Visit'),
(2063, '1', '2022-11-07', '01:27:09', 'Product-Attributes', 'Visit'),
(2064, '1', '2022-11-07', '01:27:10', 'Product-AttributesValue', 'Viewed Attribute Value: upd an Attribute (2749)'),
(2065, '1', '2022-11-07', '01:27:13', 'Product-AttributesValue', 'Deleted an Attribute Value: test (22550) from upd an Attribute (2749)'),
(2066, '1', '2022-11-07', '01:27:13', 'Product-AttributesValue', 'Viewed Attribute Value: upd an Attribute (2749)'),
(2067, '1', '2022-11-07', '01:29:26', 'Product-Attributes', 'Visit'),
(2068, '1', '2022-11-07', '01:29:27', 'Product-Attributes', 'Visit'),
(2069, '1', '2022-11-07', '01:29:29', 'Product-Attributes', 'Attempting to Update Attribute: upd an Attribute (2749)'),
(2070, '1', '2022-11-07', '01:29:29', 'Product-Attributes', 'Visit'),
(2071, '1', '2022-11-07', '01:29:30', 'Product-Attributes', 'Visit'),
(2072, '1', '2022-11-07', '01:29:30', 'Product-Attributes', 'Deleted Attribute: [object Object] (2749)'),
(2073, '1', '2022-11-07', '01:29:30', 'Product-Attributes', 'Visit'),
(2074, '1', '2022-11-07', '01:29:30', 'Product-Attributes', 'Visit'),
(2075, '1', '2022-11-07', '01:49:56', 'Logout', 'Logged Out User: Admin1'),
(2076, '1', '2022-11-07', '01:50:46', 'Login', 'Logged In User: Admin1'),
(2077, '1', '2022-11-07', '01:50:46', 'Inventory-Stocks', 'Visit'),
(2078, '1', '2022-11-07', '01:50:50', 'Inventory-Stocks', 'Visit'),
(2079, '1', '2022-11-07', '02:27:11', 'Company', 'Visit'),
(2080, '1', '2022-11-07', '02:27:21', 'Company', 'Visit'),
(2081, '1', '2022-11-07', '02:27:25', 'Company', 'Visit'),
(2082, '1', '2022-11-07', '18:33:53', 'Company-FAQ', 'Inserted FAQ: Faq1'),
(2083, '1', '2022-11-07', '18:36:56', 'Product-Masterlist', 'Inserted Product: Product name1 (PRODPN99-D75MG-PFIZ-BRAN)'),
(2084, '1', '2022-11-07', '18:37:25', 'Product-Masterlist', 'Updated Product : Product name1zz (PRODPN99-D75MG-PFIZ-BRAN)'),
(2085, '1', '2022-11-07', '18:37:29', 'Product-Masterlist', 'Deleted Product : PRODPN99-D75MG-PFIZ-BRAN'),
(2086, '1', '2022-11-07', '18:37:54', 'Supplier', 'New Supplier: aaaaaaaaaa '),
(2087, '1', '2022-11-07', '18:38:02', 'Supplier', 'Updated Supplier: aaaaaaaaaaq '),
(2088, '1', '2022-11-07', '18:38:04', 'Supplier', 'Deleted Supplier: aaaaaaaaaaq '),
(2089, '1', '2022-11-07', '18:39:37', 'Adjustment-Discounts ', 'Inserted New Discount: dd (23%)'),
(2090, '1', '2022-11-07', '18:39:41', 'Adjustment-Discounts ', 'Updates Discount: dd2 (6)'),
(2091, '1', '2022-11-07', '18:41:43', 'Adjustment-Discounts ', 'Inserted New Discount: z 1%'),
(2092, '1', '2022-11-07', '18:42:34', 'Adjustment-Discounts ', 'Inserted New Discount: d 1%'),
(2093, '1', '2022-11-07', '18:42:36', 'Adjustment-Discounts', 'Deleted Discount: undefined (8)'),
(2094, '1', '2022-11-07', '18:43:50', 'Adjustment-Discounts ', 'Inserted New Discount: d 1%'),
(2095, '1', '2022-11-07', '18:43:58', 'Adjustment-Discounts ', 'Inserted New Discount: dd 12%'),
(2096, '1', '2022-11-07', '18:44:01', 'Adjustment-Discounts', 'Deleted Discount: d (9)'),
(2097, '1', '2022-11-07', '18:44:03', 'Adjustment-Discounts', 'Deleted Discount: dd (10)'),
(2098, '1', '2022-11-07', '18:48:53', 'Supplier-Purchase Order', 'New PO: PO_703498 (pending)'),
(2099, '1', '2022-11-08', '01:20:54', 'Product-Masterlist', 'Inserted Product: qqq1 (QQQ1Q123-D75MG-PFIZ-BRAN)'),
(2100, '1', '2022-11-08', '01:20:58', 'Product-Masterlist', 'Deleted Product : QQQ1Q123-D75MG-PFIZ-BRAN'),
(2101, '1', '2022-11-11', '19:50:03', 'Product-Masterlist', 'Deleted Product : YOUNYC28-U50ML-YOUN-MERC'),
(2102, '1', '2022-11-11', '20:03:01', 'Supplier-Purchase Order', 'New PO: PO_648040 (pending)'),
(2103, '1', '2022-11-11', '20:06:33', 'Goods Receipt PO', 'Inserted a GRPO GR_317793 from PO_648040'),
(2104, '1', '2022-11-11', '20:06:33', 'Supplier-Purchase Order', 'Inserted Purchase Item from PO: PO_648040'),
(2105, '1', '2022-11-11', '20:06:33', 'Inventory', 'Inserted a stock to 5473 by 10'),
(2106, '1', '2022-11-11', '20:09:35', 'Goods Receipt PO', 'Inserted a GRPO GR_237163 from PO_648040'),
(2107, '1', '2022-11-11', '20:09:35', 'Inventory', 'Inserted a stock to 5473 by 13'),
(2108, '1', '2022-11-11', '20:09:35', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_648040'),
(2109, '1', '2022-11-11', '20:10:22', 'POS-Order', 'Inserted Order: 8341727009231'),
(2110, '1', '2022-11-11', '20:10:22', 'POS-Order', 'Inserted Data to Orders: 8341727009231'),
(2111, '1', '2022-11-11', '20:10:22', 'POS-Order', 'Inventory Decreased by 13: 86'),
(2112, '1', '2022-11-11', '20:10:22', 'POS-Payment', 'New Payment from 0:8341727009231 (0)  '),
(2113, '1', '2022-11-13', '20:04:42', 'Product-Masterlist', 'Inserted Product: add (ADDA233-SXXXLRG-PFIZ-BRAN)'),
(2114, '1', '2022-11-13', '20:04:51', 'Product-Masterlist', 'Updated Product : add23 (ADD2A233-SXXXLRG-PFIZ-BRAN)'),
(2115, '1', '2022-11-13', '20:04:56', 'Product-Masterlist', 'Deleted Product : ADD2A233-SXXXLRG-PFIZ-BRAN'),
(2116, '1', '2022-11-17', '15:44:49', 'Logout', 'Logged Out User: Admin1'),
(2117, '1', '2022-11-17', '17:42:19', 'Logout', 'Logged Out User: Admin1'),
(2118, '1', '2022-11-18', '17:51:47', 'Product-Masterlist', 'Inserted Product: d (DD023-SXXLRG-PFIZ-BRAN)'),
(2119, '1', '2022-11-18', '17:51:54', 'Product-Masterlist', 'Deleted Product : DD023-SXXLRG-PFIZ-BRAN'),
(2120, '1', '2022-11-18', '17:58:05', 'Product-Masterlist', 'Deleted Product : DD023-SXXLRG-PFIZ-BRAN'),
(2121, '1', '2022-11-19', '09:43:14', 'Product-Masterlist', 'Inserted Product: z (ZZ12-SXXLRG-IPI-BRAN)'),
(2122, '1', '2022-11-19', '09:43:22', 'Product-Masterlist', 'Updated Product : z (ZZ12-SXXLRG-IPI-BRAN)'),
(2123, '1', '2022-11-19', '09:43:29', 'Product-Masterlist', 'Updated Product : z2 (Z2Z12-SXXLRG-IPI-BRAN)'),
(2124, '1', '2022-11-19', '09:43:41', 'Product-Masterlist', 'Deleted Product : Z2Z12-SXXLRG-IPI-BRAN'),
(2125, '1', '2022-11-19', '10:17:34', 'Supplier-Purchase Order', 'New PO: PO_153202 (pending)'),
(2126, '1', '2022-11-19', '10:23:19', 'Goods Receipt PO', 'Inserted a GRPO GR_728136 from PO_153202'),
(2127, '1', '2022-11-19', '10:23:19', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_153202'),
(2128, '1', '2022-11-19', '14:08:07', 'Logout', 'Logged Out User: Admin1'),
(2129, '1', '2022-11-19', '14:09:39', 'Logout', 'Logged Out User: Admin1'),
(2130, '1', '2022-11-20', '16:15:30', 'Product-Masterlist', 'Inserted Product: 2 (2223-SXXLRG-IPI-BRAN)'),
(2131, '1', '2022-11-20', '16:15:45', 'Product-Masterlist', 'Deleted Product : 2223-SXXLRG-IPI-BRAN'),
(2132, '1', '2022-11-20', '16:17:04', 'Supplier-Purchase Order', 'New PO: PO_931675 (pending)'),
(2133, '1', '2022-11-20', '16:27:49', 'POS-Order', 'Inserted Order: 2130915371559'),
(2134, '1', '2022-11-20', '16:27:49', 'POS-Order', 'Inserted Data to Orders: 2130915371559'),
(2135, '1', '2022-11-20', '16:27:50', 'POS-Order', 'Inventory Decreased by 10: 85'),
(2136, '1', '2022-11-20', '16:27:50', 'POS-Payment', 'New Payment from 0:2130915371559 (0)  '),
(2137, '1', '2022-11-20', '16:39:40', 'Goods Receipt PO', 'Inserted a GRPO GR_294045 from PO_931675'),
(2138, '1', '2022-11-20', '16:39:41', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_931675'),
(2139, '1', '2022-11-20', '16:41:52', 'Supplier-Purchase Order', 'New PO: PO_820551 (pending)'),
(2140, '1', '2022-11-20', '16:42:39', 'Goods Receipt PO', 'Inserted a GRPO GR_665497 from PO_820551'),
(2141, '1', '2022-11-20', '16:42:40', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_820551'),
(2142, '1', '2022-11-20', '16:48:26', 'Supplier-Purchase Order', 'New PO: PO_085283 (pending)'),
(2143, '1', '2022-11-21', '08:29:16', 'Supplier-Purchase Order', 'New PO: PO_372241 (pending)'),
(2144, '1', '2022-11-21', '08:29:49', 'Goods Receipt PO', 'Inserted a GRPO GR_707106 from PO_372241'),
(2145, '1', '2022-11-21', '08:29:50', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_372241'),
(2146, '1', '2022-11-21', '08:29:50', 'Inventory', 'Inserted a stock to 5903 by 23'),
(2147, '1', '2022-11-21', '12:37:11', 'POS-Order', 'Inserted Order: 9891432525719'),
(2148, '1', '2022-11-21', '12:37:11', 'POS-Order', 'Inserted Data to Orders: 9891432525719'),
(2149, '1', '2022-11-21', '12:37:12', 'POS-Order', 'Inventory Decreased by 1: 87'),
(2150, '1', '2022-11-21', '12:37:12', 'POS-Payment', 'New Payment from 0:9891432525719 (0)  '),
(2151, '1', '2022-11-21', '12:40:03', 'POS-Order', 'Inserted Order: 5506214963061'),
(2152, '1', '2022-11-21', '12:40:04', 'POS-Order', 'Inserted Data to Orders: 5506214963061'),
(2153, '1', '2022-11-21', '12:40:05', 'POS-Order', 'Inventory Decreased by 1: 87'),
(2154, '1', '2022-11-21', '12:40:05', 'POS-Payment', 'New Payment from 0:5506214963061 (0)  '),
(2155, '1', '2022-11-21', '12:40:44', 'POS-Order', 'Inserted Order: 7376162934755'),
(2156, '1', '2022-11-21', '12:40:45', 'POS-Order', 'Inserted Data to Orders: 7376162934755'),
(2157, '1', '2022-11-21', '12:40:45', 'POS-Order', 'Inventory Decreased by 1: 87'),
(2158, '1', '2022-11-21', '12:40:45', 'POS-Payment', 'New Payment from 0:7376162934755 (0)  '),
(2159, '1', '2022-11-21', '12:44:53', 'POS-Order', 'Inventory Decreased by 1: 87'),
(2160, '1', '2022-11-21', '12:55:20', 'POS-Order', 'Inventory Decreased by 1: 87'),
(2161, '1', '2022-11-21', '12:55:22', 'POS-Order', 'Inserted Order: 1780239182702'),
(2162, '1', '2022-11-21', '12:55:22', 'POS-Order', 'Inserted Data to Orders: 1780239182702'),
(2163, '1', '2022-11-21', '12:55:22', 'POS-Order', 'Inventory Decreased by 1: 87'),
(2164, '1', '2022-11-21', '12:55:32', 'POS-Order', 'Inserted Order: 4799414186314'),
(2165, '1', '2022-11-21', '12:55:33', 'POS-Order', 'Inserted Data to Orders: 4799414186314'),
(2166, '1', '2022-11-21', '12:55:33', 'POS-Order', 'Inventory Decreased by 1: 87'),
(2167, '1', '2022-11-21', '12:58:41', 'POS-Order', 'Inserted Order: 5398001831048'),
(2168, '1', '2022-11-21', '12:58:41', 'POS-Order', 'Inserted Data to Orders: 5398001831048'),
(2169, '1', '2022-11-21', '12:58:42', 'POS-Order', 'Inventory Decreased by 1: 87'),
(2170, '1', '2022-11-21', '12:58:42', 'POS-Payment', 'New Payment from 0:5398001831048 (0)  '),
(2171, '1', '2022-11-21', '15:23:48', 'POS-Order', 'Inserted Order: 8740200661115'),
(2172, '1', '2022-11-21', '15:23:48', 'POS-Order', 'Inserted Data to Orders: 8740200661115'),
(2173, '1', '2022-11-21', '15:23:48', 'POS-Payment', 'New Payment from 0:8740200661115 (0)  '),
(2174, '1', '2022-11-21', '15:23:48', 'POS-Order', 'Inventory Decreased by 15: 87'),
(2175, '1', '2022-11-21', '15:53:34', 'Goods Receipt PO', 'Inserted a GRPO GR_038562 from PO_085283'),
(2176, '1', '2022-11-21', '15:53:35', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_085283'),
(2177, '1', '2022-11-21', '15:53:36', 'Inventory', 'Inserted a stock to 5473 by 23'),
(2178, '1', '2022-11-21', '15:54:14', 'POS-Order', 'Inserted Order: 4933170316684'),
(2179, '1', '2022-11-21', '15:54:14', 'POS-Order', 'Inserted Data to Orders: 4933170316684'),
(2180, '1', '2022-11-21', '15:54:15', 'POS-Order', 'Inventory Decreased by 3: 88'),
(2181, '1', '2022-11-21', '15:54:15', 'POS-Payment', 'New Payment from 0:4933170316684 (0)  '),
(2182, '1', '2022-11-21', '15:58:05', 'POS-Order', 'Inserted Data to Orders: 4933170316684'),
(2183, '1', '2022-11-21', '15:58:06', 'POS-Order', 'Inventory Decreased by 3: 88'),
(2184, '1', '2022-11-21', '15:58:06', 'POS-Payment', 'New Payment from 0:4933170316684 (0)  '),
(2185, '1', '2022-11-22', '12:01:53', 'Logout', 'Logged Out User: Admin1'),
(2186, '0', '2022-11-22', '12:12:58', 'Logout', 'Logged Out User: 23'),
(2187, '0', '2022-11-22', '12:15:45', 'Logout', 'Logged Out User: Test'),
(2188, '1', '2022-11-22', '12:15:50', 'Login', 'Logged In User: Admin1'),
(2189, '1', '2022-11-22', '12:16:38', 'Product-Masterlist', 'Inserted Product: d (DD23-D5MG-IPI-BRAN)'),
(2190, '1', '2022-11-22', '12:18:20', 'Product-Masterlist', 'Inserted Product: d (DD023-D15ML-IPI-BRAN)'),
(2191, '1', '2022-11-22', '20:24:42', 'Product-Masterlist', 'Deleted Product : DD23-D5MG-IPI-BRAN'),
(2192, '1', '2022-11-22', '20:24:45', 'Product-Masterlist', 'Deleted Product : DD023-D15ML-IPI-BRAN'),
(2193, '1', '2022-11-22', '20:25:40', 'Product-Masterlist', 'Inserted Product: 1 (1112-D15ML-IPI-BRAN)'),
(2194, '1', '2022-11-22', '20:25:44', 'Product-Masterlist', 'Deleted Product : 1112-D15ML-IPI-BRAN'),
(2233, '1', '2022-11-22', '23:10:34', 'Product-Masterlist', 'Import from Excel: 0/0'),
(2234, '1', '2022-11-22', '23:30:08', 'Employees', 'Added User: Test'),
(2235, '1', '2022-11-23', '14:03:31', 'Login', 'Logged In User: Admin1'),
(2236, '1', '2022-11-23', '19:36:31', 'Login', 'Logged In User: Admin1'),
(2237, '1', '2022-11-23', '20:47:45', 'Login', 'Logged In User: Admin1'),
(2238, '1', '2022-11-23', '20:49:49', 'Employees', 'Updated User: undefined (2)'),
(2239, '1', '2022-11-23', '20:51:25', 'Employees', 'Updated User: undefined (2)'),
(2240, '2', '2022-11-23', '20:51:29', 'Login', 'Logged In User: User1'),
(2241, '2', '2022-11-23', '20:56:11', 'Logout', 'Logged Out User: User1'),
(2242, '1', '2022-11-23', '20:56:44', 'Login', 'Logged In User: Admin1'),
(2243, '1', '2022-11-23', '21:00:14', 'Logout', 'Logged Out User: Admin1'),
(2244, '1', '2022-11-23', '21:00:18', 'Login', 'Logged In User: Admin1'),
(2245, '1', '2022-11-23', '21:00:53', 'Logout', 'Logged Out User: Admin1'),
(2246, '1', '2022-11-23', '21:00:57', 'Login', 'Logged In User: Admin1'),
(2247, '1', '2022-11-23', '21:02:29', 'Logout', 'Logged Out User: Admin1'),
(2248, '1', '2022-11-23', '21:02:33', 'Login', 'Logged In User: Admin1'),
(2249, '1', '2022-11-23', '21:03:02', 'Logout', 'Logged Out User: Admin1'),
(2250, '1', '2022-11-23', '21:03:06', 'Login', 'Logged In User: Admin1'),
(2251, '1', '2022-11-23', '21:03:28', 'Logout', 'Logged Out User: Admin1'),
(2252, '1', '2022-11-23', '21:03:34', 'Login', 'Logged In User: Admin1'),
(2253, '1', '2022-11-23', '21:05:07', 'Employees', 'Updated User: undefined (3)'),
(2254, '1', '2022-11-23', '21:05:09', 'Logout', 'Logged Out User: Admin1'),
(2255, '1', '2022-11-23', '21:05:23', 'Employees', 'Updated User: undefined (6)'),
(2256, '6', '2022-11-23', '21:05:30', 'Login', 'Logged In User: Test'),
(2257, '1', '2022-11-23', '21:07:17', 'Logout', 'Logged Out User: Admin1'),
(2258, '6', '2022-11-23', '21:07:21', 'Login', 'Logged In User: Test'),
(2259, '6', '2022-11-23', '21:08:12', 'Logout', 'Logged Out User: Test'),
(2260, '6', '2022-11-23', '21:08:18', 'Login', 'Logged In User: Test'),
(2261, '6', '2022-11-23', '21:08:34', 'Logout', 'Logged Out User: Test'),
(2262, '1', '2022-11-23', '21:09:34', 'Login', 'Logged In User: Admin1'),
(2263, '1', '2022-11-23', '21:09:45', 'Logout', 'Logged Out User: Admin1'),
(2264, '1', '2022-11-23', '21:12:55', 'Login', 'Logged In User: Admin1'),
(2265, '1', '2022-11-23', '21:13:14', 'Logout', 'Logged Out User: Admin1'),
(2266, '1', '2022-11-23', '21:13:29', 'Login', 'Logged In User: Admin1'),
(2267, '1', '2022-11-23', '22:36:57', 'Employees', 'Updated User: User1 (2)'),
(2268, '1', '2022-11-23', '22:39:03', 'Logout', 'Logged Out User: Admin1'),
(2269, '1', '2022-11-23', '22:39:29', 'Login', 'Logged In User: Admin1'),
(2270, '1', '2022-11-23', '22:41:32', 'Logout', 'Logged Out User: Admin1'),
(2271, '1', '2022-11-23', '22:42:02', 'Login', 'Logged In User: Admin1'),
(2272, '1', '2022-11-23', '22:42:17', 'Logout', 'Logged Out User: Admin1'),
(2273, '1', '2022-11-23', '22:46:50', 'Login', 'Logged In User: Admin1'),
(2274, '1', '2022-11-23', '22:47:01', 'Logout', 'Logged Out User: Admin1'),
(2275, '1', '2022-11-23', '22:49:11', 'Login', 'Logged In User: Admin1'),
(2276, '1', '2022-11-23', '22:50:50', 'Login', 'Logged In User: Admin1'),
(2277, '1', '2022-11-23', '22:51:10', 'Login', 'Logged In User: Admin1'),
(2278, '1', '2022-11-23', '22:52:04', 'Login', 'Logged In User: Admin1'),
(2279, '1', '2022-11-23', '22:53:17', 'Login', 'Logged In User: Admin1'),
(2280, '1', '2022-11-23', '22:53:50', 'Login', 'Logged In User: Admin1'),
(2281, '1', '2022-11-23', '22:57:44', 'Login', 'Logged In User: Admin1'),
(2282, '1', '2022-11-23', '22:58:28', 'Login', 'Logged In User: Admin1'),
(2283, '1', '2022-11-23', '22:59:09', 'Login', 'Logged In User: Admin1'),
(2284, '1', '2022-11-23', '23:04:44', 'Login', 'Logged In User: Admin1'),
(2285, '1', '2022-11-23', '23:51:06', 'Product-Masterlist', 'Deleted Product : TESTT111-T15ML-TEST-TEST'),
(2286, '1', '2022-11-23', '23:51:07', 'Product-Masterlist', 'Deleted Product : TESTT119-T500MG-TEST-TEST'),
(2287, '1', '2022-11-23', '23:51:08', 'Product-Masterlist', 'Deleted Product : TESTT120-T120ML-TEST-TEST'),
(2288, '1', '2022-11-23', '23:51:11', 'Product-Masterlist', 'Deleted Product : TESTT115-T120ML-TEST-TEST'),
(2289, '1', '2022-11-23', '23:51:13', 'Product-Masterlist', 'Deleted Product : TESTT17-T1PC-TEST-TEST'),
(2290, '1', '2022-11-23', '23:51:14', 'Product-Masterlist', 'Deleted Product : TESTT118-T15ML-TEST-TEST'),
(2291, '1', '2022-11-23', '23:51:15', 'Product-Masterlist', 'Deleted Product : TESTT119-T250MG60ML-TEST-TEST'),
(2292, '1', '2022-11-23', '23:51:19', 'Product-Masterlist', 'Deleted Product : TESTT118-T125MG60ML-TEST-TEST'),
(2293, '1', '2022-11-23', '23:51:21', 'Product-Masterlist', 'Deleted Product : TESTT19-T1PC-TEST-TEST'),
(2294, '1', '2022-11-23', '23:51:22', 'Product-Masterlist', 'Deleted Product : TESTT914-T10MG-TEST-TEST'),
(2295, '1', '2022-11-23', '23:51:24', 'Product-Masterlist', 'Deleted Product : TESTT124-T500MG-TEST-TEST'),
(2296, '1', '2022-11-23', '23:51:25', 'Product-Masterlist', 'Deleted Product : TESTT81-T5MG-TEST-TEST'),
(2297, '1', '2022-11-23', '23:51:27', 'Product-Masterlist', 'Deleted Product : TESTT723-T15ML-TEST-TEST'),
(2298, '1', '2022-11-23', '23:51:30', 'Product-Masterlist', 'Deleted Product : TESTT611-T15MG60ML-TEST-TEST'),
(2299, '1', '2022-11-23', '23:51:32', 'Product-Masterlist', 'Deleted Product : TESTT511-T75MG-TEST-TEST'),
(2300, '1', '2022-11-23', '23:51:53', 'Product-Masterlist', 'Deleted Product : TESTT419-T30MG-TEST-TEST'),
(2301, '1', '2022-11-23', '23:51:57', 'Product-Masterlist', 'Deleted Product : TESTT319-T300MG-TEST-TEST'),
(2302, '1', '2022-11-23', '23:51:59', 'Product-Masterlist', 'Deleted Product : TESTT112-T600MG-TEST-TEST'),
(2303, '1', '2022-11-23', '23:52:00', 'Product-Masterlist', 'Deleted Product : TESTT215-T100MG-TEST-TEST'),
(2304, '1', '2022-11-23', '23:54:35', 'Product-Masterlist', 'Deleted Product : ACEIADA25-U25ML-ACEI-OINT'),
(2305, '1', '2022-11-23', '23:56:15', 'Product-Attributes', 'Deleted Attribute: [object Object] (31)'),
(2306, '1', '2022-11-23', '23:56:18', 'Product-Attributes', 'Deleted Attribute: [object Object] (33)'),
(2307, '1', '2022-11-23', '23:56:21', 'Product-Attributes', 'Deleted Attribute: [object Object] (34)'),
(2308, '1', '2022-11-23', '23:56:23', 'Product-Attributes', 'Deleted Attribute: [object Object] (36)'),
(2309, '1', '2022-11-23', '23:56:26', 'Product-Attributes', 'Deleted Attribute: [object Object] (42)'),
(2310, '1', '2022-11-23', '23:56:29', 'Product-Attributes', 'Deleted Attribute: [object Object] (43)'),
(2311, '1', '2022-11-23', '23:56:31', 'Product-Attributes', 'Deleted Attribute: [object Object] (41)'),
(2312, '1', '2022-11-23', '23:56:38', 'Product-Attributes', 'Deleted Attribute: [object Object] (35)'),
(2313, '1', '2022-11-23', '23:56:41', 'Product-Attributes', 'Deleted Attribute: [object Object] (37)'),
(2314, '1', '2022-11-23', '23:56:45', 'Product-Attributes', 'Deleted Attribute: [object Object] (44)'),
(2315, '1', '2022-11-23', '23:56:47', 'Product-Attributes', 'Deleted Attribute: [object Object] (40)'),
(2316, '1', '2022-11-23', '23:56:50', 'Product-Attributes', 'Deleted Attribute: [object Object] (39)'),
(2317, '1', '2022-11-23', '23:56:53', 'Product-Attributes', 'Deleted Attribute: [object Object] (38)'),
(2318, '1', '2022-11-23', '23:56:57', 'Product-Attributes', 'Deleted Attribute: [object Object] (50)'),
(2319, '1', '2022-11-23', '23:57:01', 'Product-Attributes', 'Deleted Attribute: [object Object] (46)'),
(2320, '1', '2022-11-23', '23:57:07', 'Product-Attributes', 'Deleted Attribute: [object Object] (49)'),
(2321, '1', '2022-11-23', '23:57:11', 'Product-Attributes', 'Deleted Attribute: [object Object] (48)'),
(2322, '1', '2022-11-23', '23:57:15', 'Product-Attributes', 'Deleted Attribute: [object Object] (47)'),
(2323, '1', '2022-11-23', '23:57:18', 'Product-Attributes', 'Deleted Attribute: [object Object] (45)'),
(2324, '1', '2022-11-24', '00:20:50', 'Product-Masterlist', 'Inserted Product: e (EE2-SSMLL-TEST-TEST)'),
(2325, '1', '2022-11-24', '15:12:51', 'Login', 'Logged In User: Admin1'),
(2326, '1', '2022-11-24', '16:59:41', 'POS-Order', 'Inserted Order: 7509850907282'),
(2327, '1', '2022-11-24', '16:59:41', 'POS-Order', 'Inserted Data to Orders: 7509850907282'),
(2328, '1', '2022-11-24', '16:59:41', 'POS-Order', 'Inventory Decreased by 7: 88'),
(2329, '1', '2022-11-24', '16:59:41', 'POS-Payment', 'New Payment from 0:7509850907282 (0)  '),
(2330, '1', '2022-11-24', '22:19:22', 'Product-Masterlist', 'Deleted Product : EE2-SSMLL-TEST-TEST'),
(2331, '1', '2022-11-24', '22:36:31', 'Adjustments', 'Updated Critical Level from 12 : 25%'),
(2332, '1', '2022-11-24', '22:36:52', 'Adjustments', 'Updated Critical Level from 12 : 20%'),
(2333, '1', '2022-11-25', '01:03:38', 'Login', 'Logged In User: Admin1'),
(2334, '1', '2022-11-25', '01:26:50', 'Login', 'Logged In User: Admin1'),
(2335, '1', '2022-11-25', '01:28:52', 'Login', 'Logged In User: Admin1'),
(2336, '1', '2022-11-25', '01:38:15', 'Login', 'Logged In User: Admin1'),
(2337, '1', '2022-11-25', '01:49:25', 'Product-Masterlist', 'Inserted Product: 23 (2323-SXTRLRG-IPI-BRAN)'),
(2338, '1', '2022-11-25', '01:53:45', 'Product-Masterlist', 'Inserted Product: 23 (23223-SNWBRN-IPI-BRAN)'),
(2339, '1', '2022-11-25', '02:03:54', 'Login', 'Logged In User: Admin1'),
(2340, '1', '2022-11-25', '02:06:06', 'Login', 'Logged In User: Admin1'),
(2341, '1', '2022-11-25', '02:14:58', 'Login', 'Logged In User: Admin1'),
(2342, '1', '2022-11-25', '02:35:13', 'Login', 'Logged In User: Admin1'),
(2343, '1', '2022-11-25', '08:23:32', 'Login', 'Logged In User: Admin1'),
(2344, '1', '2022-11-25', '08:25:44', 'Login', 'Logged In User: Admin1'),
(2345, '1', '2022-11-25', '11:23:06', 'Login', 'Logged In User: Admin1'),
(2346, '1', '2022-11-25', '12:16:45', 'Supplier-Purchase Order', 'New PO: PO_618007 (pending)'),
(2347, '1', '2022-11-25', '12:17:16', 'Goods Receipt PO', 'Inserted a GRPO GR_549338 from PO_618007'),
(2348, '1', '2022-11-25', '12:17:17', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_618007'),
(2349, '1', '2022-11-25', '12:21:23', 'Supplier-Purchase Order', 'New PO: PO_942712 (pending)'),
(2350, '1', '2022-11-25', '12:22:00', 'Goods Receipt PO', 'Inserted a GRPO GR_716041 from PO_942712'),
(2351, '1', '2022-11-25', '12:22:01', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_942712'),
(2352, '1', '2022-11-25', '12:35:05', 'Login', 'Logged In User: Admin1'),
(2353, '1', '2022-11-25', '20:47:38', 'Supplier-Purchase Order', 'New PO: PO_438396 (pending)'),
(2354, '1', '2022-11-25', '20:47:59', 'Goods Receipt PO', 'Inserted a GRPO GR_715160 from PO_438396'),
(2355, '1', '2022-11-25', '20:47:59', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_438396'),
(2356, '1', '2022-11-25', '20:49:46', 'Supplier-Purchase Order', 'New PO: PO_028932 (pending)'),
(2357, '1', '2022-11-25', '20:50:14', 'Goods Receipt PO', 'Inserted a GRPO GR_466983 from PO_028932'),
(2358, '1', '2022-11-25', '20:50:14', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_028932'),
(2359, '1', '2022-11-25', '20:50:14', 'Inventory', 'Inserted a stock to 7059 by 23'),
(2360, '1', '2022-11-25', '23:58:00', 'POS-Order', 'Inserted Order: testref123321'),
(2361, '1', '2022-11-25', '23:58:00', 'POS-Order', 'Inserted Data to Orders: testref123321'),
(2362, '1', '2022-11-25', '23:58:00', 'POS-Order', 'Inventory Decreased by 1: 89'),
(2363, '1', '2022-11-25', '23:58:00', 'POS-Payment', 'New Payment from 0:testref123321 (0)  '),
(2364, '1', '2022-11-26', '03:21:09', 'Company-FAQ', 'Inserted FAQ: How to order?'),
(2365, '1', '2022-11-26', '03:21:36', 'Company-FAQ', 'Viewing/Attempting to Update FAQ: How to order? (1)'),
(2366, '1', '2022-11-26', '03:21:38', 'Company-FAQ', 'Updated a FAQ: How to order? (1)'),
(2367, '1', '2022-11-26', '03:21:40', 'Company-FAQ', 'Viewing/Attempting to Update FAQ: How to order? (1)'),
(2368, '1', '2022-11-26', '03:21:43', 'Company-FAQ', 'Updated a FAQ: How to order? (1)'),
(2369, '1', '2022-11-26', '14:32:05', 'Supplier-Purchase Order', 'New PO: PO_857364 (pending)'),
(2370, '1', '2022-11-27', '00:23:29', 'Login', 'Logged In User: Admin1'),
(2371, '1', '2022-11-27', '00:42:25', 'POS-Order', 'Inserted Order: mayareference'),
(2372, '1', '2022-11-27', '00:42:25', 'POS-Order', 'Inserted Data to Orders: mayareference'),
(2373, '1', '2022-11-27', '00:42:26', 'POS-Order', 'Inventory Decreased by 9: 89'),
(2374, '1', '2022-11-27', '00:42:26', 'POS-Payment', 'New Payment from 0:mayareference (0)  '),
(2375, '1', '2022-11-27', '22:31:50', 'Login', 'Logged In User: Admin1'),
(2376, '1', '2022-11-28', '01:53:24', 'Login', 'Logged In User: Admin1'),
(2377, '1', '2022-11-28', '01:55:32', 'POS-Order', 'Inserted Order: 0365059149154'),
(2378, '1', '2022-11-28', '01:55:32', 'POS-Order', 'Inserted Data to Orders: 0365059149154'),
(2379, '1', '2022-11-28', '01:55:33', 'POS-Order', 'Inserted Data to Orders: 0365059149154'),
(2380, '1', '2022-11-28', '01:55:33', 'POS-Order', 'Inventory Decreased by 5: 88'),
(2381, '1', '2022-11-28', '01:55:33', 'POS-Order', 'Inventory Decreased by 5: 89'),
(2382, '1', '2022-11-28', '01:55:33', 'POS-Payment', 'New Payment from 0:0365059149154 (0)  '),
(2383, '1', '2022-11-28', '02:09:55', 'POS-Order', 'Inserted Order: 9431091160518'),
(2384, '1', '2022-11-28', '02:09:55', 'POS-Order', 'Inserted Data to Orders: 9431091160518'),
(2385, '1', '2022-11-28', '02:09:55', 'POS-Order', 'Inserted Data to Orders: 9431091160518'),
(2386, '1', '2022-11-28', '02:09:55', 'POS-Order', 'Inventory Decreased by 1: 88'),
(2387, '1', '2022-11-28', '02:09:55', 'POS-Order', 'Inventory Decreased by 1: 89'),
(2388, '1', '2022-11-28', '02:09:55', 'POS-Payment', 'New Payment from 0:9431091160518 (0)  '),
(2389, '1', '2022-11-28', '02:36:09', 'POS-Order', 'Inserted Order: 4353968441124'),
(2390, '1', '2022-11-28', '02:36:09', 'POS-Order', 'Inserted Data to Orders: 4353968441124'),
(2391, '1', '2022-11-28', '02:36:09', 'POS-Order', 'Inserted Data to Orders: 4353968441124'),
(2392, '1', '2022-11-28', '02:36:09', 'POS-Order', 'Inventory Decreased by 1: 88'),
(2393, '1', '2022-11-28', '02:36:09', 'POS-Order', 'Inventory Decreased by 1: 89'),
(2394, '1', '2022-11-28', '02:36:10', 'POS-Payment', 'New Payment from 0:4353968441124 (0)  '),
(2395, '1', '2022-11-28', '02:41:02', 'POS-Order', 'Inserted Order: 6284049798374'),
(2396, '1', '2022-11-28', '02:41:02', 'POS-Order', 'Inserted Data to Orders: 6284049798374'),
(2397, '1', '2022-11-28', '02:41:02', 'POS-Order', 'Inventory Decreased by 1: 88'),
(2398, '1', '2022-11-28', '02:41:03', 'POS-Payment', 'New Payment from 0:6284049798374 (0)  '),
(2399, '1', '2022-11-28', '02:45:01', 'POS-Order', 'Inserted Order: 0074227662802'),
(2400, '1', '2022-11-28', '02:45:01', 'POS-Order', 'Inserted Data to Orders: 0074227662802'),
(2401, '1', '2022-11-28', '02:45:01', 'POS-Order', 'Inventory Decreased by 1: 88'),
(2402, '1', '2022-11-28', '02:45:01', 'POS-Payment', 'New Payment from 0:0074227662802 (0)  '),
(2403, '1', '2022-11-28', '22:09:29', 'Login', 'Logged In User: Admin1'),
(2404, '1', '2022-11-28', '23:29:38', 'POS-Order', 'Inserted Order: 9621322836439'),
(2405, '1', '2022-11-28', '23:29:38', 'POS-Order', 'Inserted Data to Orders: 9621322836439'),
(2406, '1', '2022-11-28', '23:29:38', 'POS-Payment', 'New Payment from 0:9621322836439 (0)  '),
(2407, '1', '2022-11-28', '23:29:38', 'POS-Order', 'Inventory Decreased by 1: 89'),
(2408, '1', '2022-11-28', '23:36:31', 'Login', 'Logged In User: Admin1'),
(2409, '1', '2022-12-02', '04:45:36', 'Login', 'Logged In User: Admin1'),
(2410, '1', '2022-12-02', '04:50:34', 'Supplier-Purchase Order', 'New PO: PO_653079 (pending)'),
(2411, '1', '2022-12-02', '04:51:19', 'Goods Receipt PO', 'Inserted a GRPO GR_751193 from PO_857364'),
(2412, '1', '2022-12-02', '04:51:20', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_857364'),
(2413, '1', '2022-12-02', '04:51:20', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_857364'),
(2414, '1', '2022-12-02', '04:51:20', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_857364'),
(2415, '1', '2022-12-02', '04:51:21', 'Inventory', 'Inserted a stock to 5679 by 50'),
(2416, '1', '2022-12-02', '04:51:21', 'Inventory', 'Inserted a stock to 5677 by 30'),
(2417, '1', '2022-12-02', '04:51:21', 'Inventory', 'Inserted a stock to 5774 by 100'),
(2418, '1', '2022-12-02', '04:52:41', 'Goods Receipt PO', 'Inserted a GRPO GR_029717 from PO_653079'),
(2419, '1', '2022-12-02', '04:52:42', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_653079'),
(2420, '1', '2022-12-02', '04:52:42', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_653079'),
(2421, '1', '2022-12-02', '04:52:43', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_653079'),
(2422, '1', '2022-12-02', '04:52:43', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_653079'),
(2423, '1', '2022-12-02', '04:52:43', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_653079'),
(2424, '1', '2022-12-02', '04:52:43', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_653079'),
(2425, '1', '2022-12-02', '04:52:43', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_653079'),
(2426, '1', '2022-12-02', '04:52:43', 'Supplier-Purchase Order', 'Updated Purchase Item from PO: PO_653079'),
(2427, '1', '2022-12-02', '04:52:43', 'Inventory', 'Inserted a stock to 5651 by 100'),
(2428, '1', '2022-12-02', '04:52:44', 'Inventory', 'Inserted a stock to 5267 by 100'),
(2429, '1', '2022-12-02', '04:52:44', 'Inventory', 'Inserted a stock to 5639 by 100'),
(2430, '1', '2022-12-02', '04:52:44', 'Inventory', 'Inserted a stock to 5584 by 100'),
(2431, '1', '2022-12-02', '04:52:44', 'Inventory', 'Inserted a stock to 5454 by 100'),
(2432, '1', '2022-12-02', '04:52:44', 'Inventory', 'Inserted a stock to 5867 by 100'),
(2433, '1', '2022-12-02', '04:52:44', 'Inventory', 'Inserted a stock to 5470 by 100'),
(2434, '1', '2022-12-02', '04:52:45', 'Inventory', 'Inserted a stock to 5561 by 100'),
(2435, '1', '2022-12-06', '16:17:03', 'Login', 'Logged In User: Admin1'),
(2436, '1', '2022-12-06', '16:18:24', 'Login', 'Logged In User: Admin1'),
(2437, '1', '2022-12-06', '16:46:10', 'Adjustments', 'Updated Critical Level from 16 : 25%'),
(2438, '1', '2022-12-06', '16:46:15', 'Adjustments', 'Updated Critical Level from 18 : 12%'),
(2439, '1', '2022-12-06', '16:46:21', 'Adjustments', 'Updated Critical Level from 12 : 20%'),
(2440, '1', '2022-12-06', '16:46:53', 'Adjustments', 'Updated Critical Level from 16 : 10%'),
(2441, '1', '2022-12-06', '16:46:59', 'Adjustments', 'Updated Critical Level from 14 : 10%'),
(2442, '1', '2022-12-06', '16:47:04', 'Adjustments', 'Updated Critical Level from 18 : 10%'),
(2443, '1', '2022-12-06', '16:47:07', 'Adjustments', 'Updated Critical Level from 12 : 10%'),
(2444, '1', '2022-12-06', '18:48:17', 'Login', 'Logged In User: Admin1'),
(2445, '1', '2022-12-06', '22:19:15', 'Roles', 'Inserted Role: Manager'),
(2446, '1', '2022-12-06', '22:19:44', 'Roles', 'Inserted Module from 2'),
(2447, '1', '2022-12-06', '22:20:30', 'Employees', 'Added User: employeetest'),
(2448, '7', '2022-12-06', '22:20:46', 'Login', 'Logged In User: employeetest'),
(2449, '1', '2022-12-06', '22:30:12', 'Login', 'Logged In User: Admin1'),
(2450, '1', '2022-12-06', '23:13:45', 'POS-Order', 'Updated Order: 187 (to claim)'),
(2451, '1', '2022-12-06', '23:15:59', 'POS-Order', 'Updated Order: 187 (paid)'),
(2452, '1', '2022-12-06', '23:40:29', 'POS-Order', 'Updated Order: 195 (to claim)'),
(2453, '1', '2022-12-06', '23:42:04', 'POS-Order', 'Updated Order: 196 (to claim)'),
(2454, '1', '2022-12-06', '23:50:52', 'POS-Order', 'Updated Order: 191 (paid)'),
(2455, '1', '2022-12-06', '23:56:04', 'POS-Order', 'Updated Order: 199 (pending)'),
(2456, '1', '2022-12-06', '23:56:10', 'POS-Order', 'Updated Order: 199 (to claim)'),
(2457, '1', '2022-12-06', '23:56:33', 'POS-Order', 'Updated Order: 199 (paid)'),
(2458, '1', '2022-12-07', '00:04:45', 'POS-Order', 'Updated Order: 199 (paid)'),
(2459, '1', '2022-12-07', '01:01:17', 'POS-Order', 'Updated Order: 197 (to claim)'),
(2460, '1', '2022-12-07', '01:03:57', 'POS-Order', 'Inventory Decreased by 10: undefined'),
(2461, '1', '2022-12-07', '01:03:57', 'POS-Order', 'Inventory Decreased by 20: undefined'),
(2462, '1', '2022-12-07', '01:03:58', 'POS-Order', 'Updated Order: 192 (paid)'),
(2463, '1', '2022-12-07', '01:03:57', 'POS-Order', 'Inventory Decreased by 1: undefined'),
(2464, '1', '2022-12-07', '01:08:51', 'POS-Order', 'Updated Order: 198 (to claim)'),
(2465, '1', '2022-12-07', '01:09:02', 'POS-Order', 'Inventory Decreased by 2: undefined'),
(2466, '1', '2022-12-07', '01:09:02', 'POS-Order', 'Inventory Decreased by 1: undefined'),
(2467, '1', '2022-12-07', '01:09:02', 'POS-Order', 'Updated Order: 198 (paid)'),
(2468, '1', '2022-12-07', '01:43:06', 'POS-Order', 'Inserted Order: 67181744804437438'),
(2469, '1', '2022-12-07', '01:43:07', 'POS-Order', 'Inserted Data to Orders: 67181744804437438'),
(2470, '1', '2022-12-07', '01:43:07', 'POS-Order', 'Inserted Data to Orders: 67181744804437438'),
(2471, '1', '2022-12-07', '01:43:07', 'POS-Order', 'Inserted Data to Orders: 67181744804437438'),
(2472, '1', '2022-12-07', '01:43:07', 'POS-Order', 'Inserted Data to Orders: 67181744804437438'),
(2473, '1', '2022-12-07', '01:43:07', 'POS-Order', 'Inserted Data to Orders: 67181744804437438'),
(2474, '1', '2022-12-07', '01:43:07', 'POS-Order', 'Inserted Data to Orders: 67181744804437438'),
(2475, '1', '2022-12-07', '01:43:07', 'POS-Order', 'Inserted Data to Orders: 67181744804437438'),
(2476, '1', '2022-12-07', '01:43:07', 'POS-Order', 'Inserted Data to Orders: 67181744804437438'),
(2477, '1', '2022-12-07', '01:43:08', 'POS-Order', 'Inserted Data to Orders: 67181744804437438'),
(2478, '1', '2022-12-07', '01:43:08', 'POS-Order', 'Inventory Decreased by 10: 93'),
(2479, '1', '2022-12-07', '01:43:08', 'POS-Order', 'Inventory Decreased by 10: 94'),
(2480, '1', '2022-12-07', '01:43:08', 'POS-Order', 'Inventory Decreased by 10: 95'),
(2481, '1', '2022-12-07', '01:43:08', 'POS-Order', 'Inventory Decreased by 10: 96'),
(2482, '1', '2022-12-07', '01:43:08', 'POS-Order', 'Inventory Decreased by 10: 97'),
(2483, '1', '2022-12-07', '01:43:09', 'POS-Order', 'Inventory Decreased by 10: 98'),
(2484, '1', '2022-12-07', '01:43:09', 'POS-Order', 'Inventory Decreased by 10: 99'),
(2485, '1', '2022-12-07', '01:43:09', 'POS-Order', 'Inventory Decreased by 10: 100'),
(2486, '1', '2022-12-07', '01:43:09', 'POS-Order', 'Inventory Decreased by 10: 101'),
(2487, '1', '2022-12-07', '01:43:09', 'POS-Payment', 'New Payment from 0:67181744804437438 (0)  ');

-- --------------------------------------------------------

--
-- Table structure for table `tblbrand`
--

CREATE TABLE `tblbrand` (
  `BrandID` bigint(30) NOT NULL,
  `Brand_Name` varchar(300) NOT NULL,
  `Status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblbrand`
--

INSERT INTO `tblbrand` (`BrandID`, `Brand_Name`, `Status`) VALUES
(107, 'Selecta', 'inactive'),
(111, 'IPI', 'active'),
(112, 'Pfizer', 'active'),
(113, 'Nestle', 'active'),
(123, 'EQ', 'active'),
(138, 'Eskinol', 'active'),
(194, 'RX', 'active'),
(242, 'Generic Medicine', 'active'),
(419, 'Biguerlai', 'active'),
(420, 'Biofitea', 'active'),
(422, 'C-lium', 'active'),
(423, 'Eyeberry', 'active'),
(424, 'Honey', 'active'),
(425, 'Malunggay', 'active'),
(426, 'Lola', 'active'),
(427, 'Lipton', 'active'),
(431, 'Kidney', 'active'),
(432, 'MX3', 'active'),
(433, 'Silymarin', 'active'),
(434, 'Sambong', 'active'),
(436, 'Optein', 'active'),
(437, 'Aceite', 'active'),
(438, 'Xanthone', 'active'),
(440, 'Turmeric', 'active'),
(442, 'Taheboo', 'active'),
(444, 'Betamethasone', 'active'),
(447, 'Bioderm', 'active'),
(448, 'BL', 'active'),
(449, 'Calmoseptine', 'active'),
(451, 'Chili', 'active'),
(454, 'Clobetasol', 'active'),
(455, 'Clotrimazole', 'active'),
(456, 'Dequadin', 'active'),
(457, 'Difflam', 'active'),
(462, 'Efficascent', 'active'),
(468, 'Eye', 'active'),
(470, 'Fungisol', 'active'),
(471, 'Hydrocortisone', 'active'),
(472, 'Katialis', 'active'),
(475, 'Katinko', 'active'),
(480, 'Mupirocin', 'active'),
(481, 'Oil', 'active'),
(484, 'Omega', 'active'),
(487, 'Petroleum', 'active'),
(491, 'Salicylic', 'active'),
(493, 'Salonpas', 'active'),
(494, 'Silver', 'active'),
(495, 'Stepsils', 'active'),
(496, 'Strepsils', 'active'),
(501, 'Sulfur', 'active'),
(502, 'Superscent', 'active'),
(504, 'Tobramycin', 'active'),
(505, 'Toothache', 'active'),
(507, 'Vicks', 'active'),
(519, 'Xylogel', 'active'),
(520, 'Anlene', 'active'),
(523, 'Bearbrand', 'active'),
(526, 'Bonakid', 'active'),
(527, 'Anmum', 'active'),
(531, 'Bonamil', 'active'),
(534, 'Cerelac', 'active'),
(536, 'Care', 'active'),
(537, 'Bonna', 'active'),
(538, 'Caress', 'active'),
(555, 'Happy', 'active'),
(573, 'Lactum', 'active'),
(577, 'Nestogen', 'active'),
(586, 'Nido', 'active'),
(591, 'Pampers', 'active'),
(603, 'Althea', 'active'),
(604, 'Daphne', 'active'),
(605, 'Diane', 'active'),
(606, 'Ez', 'active'),
(609, 'Pediasure', 'active'),
(610, 'Lady', 'active'),
(611, 'Marvelon', 'active'),
(612, 'Micropill', 'active'),
(613, 'Robust', 'active'),
(614, 'Trust', 'active'),
(619, 'Alaxan', 'active'),
(620, 'Advil', 'active'),
(621, 'Allerkid', 'active'),
(624, 'Amlife', 'active'),
(625, 'Arcoxia', 'active'),
(626, 'Alnix', 'active'),
(629, 'Allerta', 'active'),
(632, 'Ascof', 'active'),
(636, 'Asmalin', 'active'),
(637, 'Aspilet', 'active'),
(639, 'Betadine', 'active'),
(640, 'Bactidol', 'active'),
(641, 'Bewell', 'active'),
(642, 'Bioflu', 'active'),
(645, 'Calpol', 'active'),
(647, 'Buscopan', 'active'),
(648, 'Biogesic', 'active'),
(652, 'Caltrate', 'active'),
(653, 'Catapres', 'active'),
(655, 'Ceelin', 'active'),
(666, 'Centrum', 'active'),
(668, 'Cherifer', 'active'),
(669, 'Co-aleva', 'active'),
(672, 'Co-altria', 'active'),
(674, 'Conzace', 'active'),
(675, 'Claritin', 'active'),
(677, 'Decilone', 'active'),
(678, 'Decolgen', 'active'),
(679, 'Disudrin', 'active'),
(682, 'Decolsin', 'active'),
(685, 'Diatabs', 'active'),
(688, 'Dolan', 'active'),
(689, 'Dynatussin', 'active'),
(690, 'Drenex', 'active'),
(691, 'Dolo', 'active'),
(692, 'Dolfenal', 'active'),
(694, 'Enervon', 'active'),
(697, 'Euthyrox', 'active'),
(698, 'Expel', 'active'),
(700, 'Fern', 'active'),
(701, 'Ferlin', 'active'),
(703, 'Fluimucil', 'active'),
(704, 'Flanax', 'active'),
(706, 'Gaviscon', 'active'),
(707, 'Folart', 'active'),
(708, 'Forti-D', 'active'),
(709, 'Hemarate', 'active'),
(710, 'Gardan', 'active'),
(711, 'Growee', 'active'),
(713, 'Gencee', 'active'),
(715, 'Herbycin', 'active'),
(716, 'Hydrite', 'active'),
(717, 'Immunpro', 'active'),
(718, 'Kool', 'active'),
(719, 'Kremil', 'active'),
(721, 'Iberet', 'active'),
(722, 'Imodium', 'active'),
(725, 'K-lyte', 'active'),
(726, 'Lomotil', 'active'),
(727, 'Loviscol', 'active'),
(728, 'Maxvit', 'active'),
(730, 'Maalox', 'active'),
(731, 'Medicol', 'active'),
(732, 'Myra', 'active'),
(734, 'Midol', 'active'),
(735, 'Motillium', 'active'),
(736, 'Myonal', 'active'),
(739, 'Nafarin-A', 'active'),
(740, 'Nasatapp', 'active'),
(741, 'Neokidilets', 'active'),
(742, 'Neozep', 'active'),
(746, 'Neurobion', 'active'),
(748, 'Neurogen-E', 'active'),
(749, 'Nizoral', 'active'),
(750, 'Norgesic', 'active'),
(751, 'Nutrilin', 'active'),
(752, 'Nutroplex', 'active'),
(753, 'Plemex', 'active'),
(754, 'Pedialyte', 'active'),
(755, 'Pedzinc', 'active'),
(756, 'Pediamox', 'active'),
(762, 'Pharex', 'active'),
(763, 'Ponstan', 'active'),
(764, 'Propan', 'active'),
(766, 'Re-leaf', 'active'),
(768, 'Poten-cee', 'active'),
(771, 'Provera', 'active'),
(772, 'Restime', 'active'),
(773, 'Revicon', 'active'),
(774, 'Rexidol', 'active'),
(775, 'Ritemed', 'active'),
(781, 'Robitussin', 'active'),
(784, 'Robokids', 'active'),
(787, 'Salinase', 'active'),
(789, 'Sangobion', 'active'),
(790, 'Saridon', 'active'),
(791, 'Simeco', 'active'),
(792, 'Sinecod', 'active'),
(793, 'Sinupret', 'active'),
(794, 'Skelan', 'active'),
(796, 'Sleepwell', 'active'),
(797, 'Sodium', 'active'),
(798, 'Solmux', 'active'),
(800, 'Sleepasil', 'active'),
(805, 'Stresstabs', 'active'),
(806, 'Tempa', 'active'),
(807, 'Tempra', 'active'),
(811, 'Tiki', 'active'),
(818, 'Ventolin', 'active'),
(819, 'Tuseran', 'active'),
(822, 'UH', 'active'),
(826, 'Virlix', 'active'),
(827, 'Zykast', 'active'),
(828, 'Ener-A', 'active'),
(829, 'Apollo', 'active'),
(830, 'Acetone', 'active'),
(831, 'Axe', 'active'),
(834, 'Baby', 'active'),
(843, 'Bench', 'active'),
(850, 'Bigen', 'active'),
(856, 'Casino', 'active'),
(858, 'Caronia', 'active'),
(859, 'Bon', 'active'),
(865, 'Colgate', 'active'),
(869, 'Cuticle', 'active'),
(874, 'Doctor', 'active'),
(876, 'Dove', 'active'),
(895, 'Farlin', 'active'),
(898, 'Femme', 'active'),
(901, 'Green', 'active'),
(902, 'Gatzby', 'active'),
(903, 'Fiona', 'active'),
(904, 'Fissan', 'active'),
(905, 'Fix', 'active'),
(914, 'Hair', 'active'),
(915, 'Happee', 'active'),
(924, 'High', 'active'),
(925, 'Hydrogen', 'active'),
(929, 'Icolor', 'active'),
(935, 'iwhite', 'active'),
(941, 'Jergens', 'active'),
(942, 'Johnsons', 'active'),
(958, 'Joy', 'active'),
(961, 'Juicy', 'active'),
(962, 'Kami', 'active'),
(964, 'Lactacyd', 'active'),
(966, 'Lewis', 'active'),
(971, 'Listerine', 'active'),
(972, 'Little', 'active'),
(973, 'Mama\'s', 'active'),
(974, 'Master', 'active'),
(988, 'Maxipeel', 'active'),
(996, 'Milcu', 'active'),
(1009, 'Nivea', 'active'),
(1019, 'Off', 'active'),
(1024, 'Olay', 'active'),
(1030, 'PH', 'active'),
(1036, 'Ponds', 'active'),
(1042, 'Rdl', 'active'),
(1049, 'Povidone', 'active'),
(1056, 'Rexona', 'active'),
(1068, 'Sensodyne', 'active'),
(1070, 'Safeguard', 'active'),
(1071, 'Sanicare', 'active'),
(1072, 'Silka', 'active'),
(1080, 'Skinwhite', 'active'),
(1086, 'Stylex', 'active'),
(1088, 'Tender', 'active'),
(1090, 'Tawas', 'active'),
(1092, 'Vitress', 'active'),
(1093, 'Vaseline', 'active'),
(1097, 'Youngs', 'active'),
(1098, 'test 1', 'active'),
(1099, 'test 2', 'active'),
(1100, 'test 3', 'active'),
(1101, 'test 4', 'active'),
(1102, 'test 5', 'active'),
(1103, 'test 6', 'active'),
(1104, 'test 7', 'active'),
(1105, 'test 8', 'active'),
(1106, 'test 9', 'active'),
(1107, 'test 10', 'active'),
(1108, 'test 11', 'active'),
(1109, 'test 12', 'active'),
(1110, 'test 13', 'active'),
(1111, 'test 14', 'active'),
(1112, 'test 15', 'active'),
(1113, 'test 16', 'active'),
(1114, 'test 17', 'active'),
(1115, 'test 18', 'active'),
(1116, 'test 19', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblcart`
--

CREATE TABLE `tblcart` (
  `CartID` bigint(30) NOT NULL,
  `CustomerID` bigint(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblcart`
--

INSERT INTO `tblcart` (`CartID`, `CustomerID`) VALUES
(3, 2339537344),
(2, 2875810816);

-- --------------------------------------------------------

--
-- Table structure for table `tblcartitems`
--

CREATE TABLE `tblcartitems` (
  `CartItemID` bigint(30) NOT NULL,
  `ParentCartID` bigint(30) NOT NULL,
  `InventoryID` bigint(30) NOT NULL,
  `Quantity` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblcategory`
--

CREATE TABLE `tblcategory` (
  `CategoryID` bigint(30) NOT NULL,
  `Category_Name` varchar(300) NOT NULL,
  `CatStatus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblcategory`
--

INSERT INTO `tblcategory` (`CategoryID`, `Category_Name`, `CatStatus`) VALUES
(12, 'Branded Medicine', 'active'),
(13, 'Generic Medicine', 'active'),
(14, 'Contraceptives', 'active'),
(16, 'Ointment', 'active'),
(17, 'Baby Cares', 'active'),
(18, 'Merchandise', 'active'),
(1187, 'Food Supplements', 'active'),
(1290, 'Food & Drink', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblcompanyprofile`
--

CREATE TABLE `tblcompanyprofile` (
  `companyID` bigint(30) NOT NULL,
  `companyName` varchar(300) NOT NULL,
  `owner` varchar(300) NOT NULL,
  `contact` varchar(30) NOT NULL,
  `email` varchar(300) NOT NULL,
  `date_established` date NOT NULL,
  `address` varchar(300) NOT NULL,
  `description` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblcompanyprofile`
--

INSERT INTO `tblcompanyprofile` (`companyID`, `companyName`, `owner`, `contact`, `email`, `date_established`, `address`, `description`) VALUES
(1, 'CoruMed Pharmacy', 'Jicah Mae Lumbao', '09760254804', 'jicah04@gmail.com', '2019-02-01', '35 Corumi Street Masambong Q.C.', 'Corumed Pharmacy is a drug store which provides branded and generic medicines for the people around masambong.');

-- --------------------------------------------------------

--
-- Table structure for table `tblcriticallevel`
--

CREATE TABLE `tblcriticallevel` (
  `Critical_ID` bigint(30) NOT NULL,
  `CategoryID` bigint(30) NOT NULL,
  `MaxStock` int(30) NOT NULL,
  `CriticalPercentage` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblcriticallevel`
--

INSERT INTO `tblcriticallevel` (`Critical_ID`, `CategoryID`, `MaxStock`, `CriticalPercentage`) VALUES
(1, 12, 200, '10.00'),
(3, 18, 200, '10.00'),
(8, 16, 150, '10.00'),
(0, 14, 120, '10.00');

-- --------------------------------------------------------

--
-- Table structure for table `tblcustomer`
--

CREATE TABLE `tblcustomer` (
  `CustID` bigint(30) NOT NULL,
  `CustCode` bigint(30) NOT NULL,
  `Username` varchar(300) NOT NULL,
  `Password` varchar(300) NOT NULL,
  `CustName` varchar(300) NOT NULL,
  `Contact` varchar(30) NOT NULL,
  `Address` varchar(300) NOT NULL,
  `Email` varchar(300) NOT NULL,
  `Status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblcustomer`
--

INSERT INTO `tblcustomer` (`CustID`, `CustCode`, `Username`, `Password`, `CustName`, `Contact`, `Address`, `Email`, `Status`) VALUES
(1, 0, 'walk-in', 'walk-in', 'Walk-In', '09655926321', 'sample address', 'test email', 'active'),
(3, 7643541859, 'tortillos', '$2a$10$R2BOsu5Dy0b74x6vHj5yQOc3yvBKQ5PKjI6IPrN0xBfSn9KXhg3Ny', 'hans atillo', '09655465456', '123 sampaloc street qc', 'atillo@gmail.com', 'active'),
(4, 1993846830, 'rayn123', '$2a$10$TVuHkJD2GsqLhAU0pUcIw.stMj5lwvtVDZ6Jkq8tSRRIDMYo1HTYe', 'ryan oro', '09123123123', '123 sampaguita st. quezon city', 'ryangueta@gmail.com', 'active'),
(5, 2833916759, 'maybuena29', '$2a$10$mZmzoYZGSa5iHH9X2ZlcE.WNNIlbECQL2W5mD690WiMCGq26abSSa', 'benjie maybuena', '09912313123', '8 c1 kaingin road bal qc', 'maybuena2929@gmail.com', 'active'),
(10, 2875810816, 'test', '$2a$10$HBG.FfD0n8Idcp7Iub48rOVmo8jyv.j5LLUqA9r03do5NsNuihCr.', 'test test', '09123123123', '123 test address', 'test@gmail.com', 'active'),
(11, 2339537344, 'sample', '$2a$10$TbRmv5jBR1ewOy4eahK53.b9AwNH5vePWjc3Wz6YBCzxkbugUzFfC', 'sample sample', '09123123123', 'sample address', 'sample@gmail.com', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblcustomerpoints`
--

CREATE TABLE `tblcustomerpoints` (
  `PntCustID` bigint(30) NOT NULL,
  `CustCode` bigint(30) NOT NULL,
  `CurrentPoints` int(11) NOT NULL,
  `LastUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblcustomerpoints`
--

INSERT INTO `tblcustomerpoints` (`PntCustID`, `CustCode`, `CurrentPoints`, `LastUpdate`) VALUES
(1, 7643541859, 4, '2022-12-02 20:00:24');

-- --------------------------------------------------------

--
-- Table structure for table `tbldiscount`
--

CREATE TABLE `tbldiscount` (
  `DiscountID` bigint(30) NOT NULL,
  `Discount_Name` varchar(300) NOT NULL,
  `Discount_Value` int(30) NOT NULL,
  `Status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbldiscount`
--

INSERT INTO `tbldiscount` (`DiscountID`, `Discount_Name`, `Discount_Value`, `Status`) VALUES
(1, 'PWD', 20, 'active'),
(2, 'Promo1', 5, 'active'),
(3, 'Senior Citizen', 20, 'active'),
(5, 'Promo 2', 5, 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `tblfaqs`
--

CREATE TABLE `tblfaqs` (
  `faqID` bigint(30) NOT NULL,
  `question` varchar(1000) NOT NULL,
  `answer` varchar(1000) NOT NULL,
  `status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblfaqs`
--

INSERT INTO `tblfaqs` (`faqID`, `question`, `answer`, `status`) VALUES
(1, 'How to order?', 'Add your item to your cart, enter how many do you want. Afterwards, you can proceed to your cart and check out the items which will redirect you to the placement of order where you can choose what type of payment you would do.', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblgoodsitems`
--

CREATE TABLE `tblgoodsitems` (
  `gItemID` bigint(30) NOT NULL,
  `gItemQuantity` int(30) NOT NULL,
  `productID` bigint(30) NOT NULL,
  `gMarkup` decimal(10,2) NOT NULL,
  `gSalesPrice` decimal(10,2) NOT NULL,
  `gExpiryDate` date NOT NULL,
  `gDiscount` decimal(10,2) NOT NULL,
  `gNetPrice` decimal(10,2) NOT NULL,
  `gAmount` decimal(10,2) NOT NULL,
  `parentGR_ID` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblgoodsitems`
--

INSERT INTO `tblgoodsitems` (`gItemID`, `gItemQuantity`, `productID`, `gMarkup`, `gSalesPrice`, `gExpiryDate`, `gDiscount`, `gNetPrice`, `gAmount`, `parentGR_ID`) VALUES
(49, 10, 5473, '30.00', '32.50', '2022-11-11', '0.00', '250.00', '250.00', 'GR_317793'),
(50, 13, 5473, '30.00', '32.50', '2026-11-12', '0.00', '325.00', '325.00', 'GR_237163'),
(51, 23, 5474, '31.00', '60.26', '2022-11-23', '0.00', '1058.00', '1058.00', 'GR_728136'),
(52, 23, 5473, '45.00', '36.25', '2022-11-30', '3.00', '575.00', '557.75', 'GR_294045'),
(53, 20, 5274, '33.00', '18.62', '2023-12-01', '3.00', '280.00', '271.60', 'GR_665497'),
(54, 23, 5903, '10.00', '41.80', '2025-11-13', '0.00', '874.00', '874.00', 'GR_707106'),
(55, 23, 5473, '50.00', '37.50', '2022-11-30', '3.00', '575.00', '557.75', 'GR_038562'),
(56, 20, 5477, '30.00', '58.50', '2022-11-30', '3.00', '900.00', '873.00', 'GR_549338'),
(57, 100, 6996, '15.00', '32.20', '2022-11-25', '3.00', '2800.00', '2716.00', 'GR_716041'),
(60, 50, 5679, '15.00', '26.45', '2023-12-08', '0.00', '1150.00', '1150.00', 'GR_751193'),
(61, 100, 5774, '15.00', '4.60', '2023-12-30', '0.00', '400.00', '400.00', 'GR_751193'),
(62, 30, 5677, '15.00', '52.90', '2023-12-02', '0.00', '1380.00', '1380.00', 'GR_751193'),
(63, 100, 5651, '15.00', '4.60', '2023-12-02', '0.00', '400.00', '400.00', 'GR_029717'),
(64, 100, 5267, '50.00', '22.50', '2023-12-30', '0.00', '1500.00', '1500.00', 'GR_029717'),
(65, 100, 5639, '50.00', '213.00', '2023-12-02', '0.00', '14200.00', '14200.00', 'GR_029717'),
(66, 100, 5584, '50.00', '52.50', '2023-12-02', '0.00', '3500.00', '3500.00', 'GR_029717'),
(67, 100, 5454, '50.00', '6.00', '2023-12-02', '0.00', '400.00', '400.00', 'GR_029717'),
(68, 100, 5867, '15.00', '110.40', '2023-12-02', '0.00', '9600.00', '9600.00', 'GR_029717'),
(69, 100, 5470, '48.00', '13.32', '2023-12-02', '0.00', '900.00', '900.00', 'GR_029717'),
(70, 100, 5561, '50.00', '10.50', '2023-12-02', '10.00', '700.00', '630.00', 'GR_029717');

-- --------------------------------------------------------

--
-- Table structure for table `tblgoodsreceiptpo`
--

CREATE TABLE `tblgoodsreceiptpo` (
  `goodsID` bigint(30) NOT NULL,
  `GRNumber` varchar(300) NOT NULL,
  `PONumber` varchar(300) NOT NULL,
  `DateDelivered` date NOT NULL,
  `Remarks` varchar(300) DEFAULT NULL,
  `Status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblgoodsreceiptpo`
--

INSERT INTO `tblgoodsreceiptpo` (`goodsID`, `GRNumber`, `PONumber`, `DateDelivered`, `Remarks`, `Status`) VALUES
(42, 'GR_317793', 'PO_648040', '2022-11-11', 'Based on PO_648040', 'paid'),
(43, 'GR_237163', 'PO_648040', '2022-11-11', 'Based on PO_648040. From back order.', 'paid'),
(44, 'GR_728136', 'PO_153202', '2022-11-22', 'Based on PO_153202', 'pending'),
(45, 'GR_294045', 'PO_931675', '2022-11-30', 'Based on PO_931675', 'pending'),
(46, 'GR_665497', 'PO_820551', '2022-11-30', 'Based on PO_820551', 'pending'),
(47, 'GR_707106', 'PO_372241', '2022-11-30', 'Based on PO_372241', 'paid'),
(48, 'GR_038562', 'PO_085283', '2022-11-22', 'Based on PO_085283', 'pending'),
(49, 'GR_549338', 'PO_618007', '2022-11-29', 'Based on PO_618007', 'pending'),
(50, 'GR_716041', 'PO_942712', '2022-11-25', 'Based on PO_942712', 'pending'),
(53, 'GR_751193', 'PO_857364', '2022-12-02', 'Based on PO_857364', 'pending'),
(54, 'GR_029717', 'PO_653079', '2022-12-02', 'Based on PO_653079', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `tblinventory`
--

CREATE TABLE `tblinventory` (
  `inventoryID` bigint(30) NOT NULL,
  `productID` bigint(30) NOT NULL,
  `inventoryQuantity` int(11) NOT NULL,
  `inventorySalesPrice` decimal(10,2) NOT NULL,
  `Supplier` bigint(10) NOT NULL,
  `inventoryDateExp` date NOT NULL,
  `inventoryStatus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblinventory`
--

INSERT INTO `tblinventory` (`inventoryID`, `productID`, `inventoryQuantity`, `inventorySalesPrice`, `Supplier`, `inventoryDateExp`, `inventoryStatus`) VALUES
(85, 5473, 0, '32.50', 3, '2022-11-11', 'active'),
(86, 5473, 0, '32.50', 3, '2026-11-12', 'active'),
(87, 5903, 0, '41.80', 3, '2025-11-13', 'active'),
(88, 5473, 1, '37.50', 3, '2022-11-30', 'active'),
(89, 5477, 2, '58.50', 3, '2022-11-30', 'active'),
(90, 6996, 100, '32.20', 8, '2022-11-25', 'active'),
(93, 5481, 10, '50.00', 3, '2023-12-12', 'active'),
(94, 5679, 40, '26.45', 9, '2023-12-07', 'active'),
(95, 5677, 20, '52.90', 9, '2023-12-01', 'active'),
(96, 5774, 90, '4.60', 9, '2023-12-29', 'active'),
(97, 5651, 90, '4.60', 6, '2023-12-01', 'active'),
(98, 5267, 90, '22.50', 6, '2023-12-29', 'active'),
(99, 5639, 90, '213.00', 6, '2023-12-01', 'active'),
(100, 5584, 90, '52.50', 6, '2023-12-01', 'active'),
(101, 5454, 90, '6.00', 6, '2023-12-01', 'active'),
(102, 5867, 100, '110.40', 6, '2023-12-01', 'active'),
(103, 5470, 100, '13.32', 6, '2023-12-01', 'active'),
(104, 5561, 100, '10.50', 6, '2023-12-01', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblorderitems`
--

CREATE TABLE `tblorderitems` (
  `itemOrderID` bigint(30) NOT NULL,
  `productID` bigint(30) NOT NULL,
  `inventoryID` bigint(30) NOT NULL,
  `ReferenceNumber` varchar(300) NOT NULL,
  `productPrice` decimal(10,2) NOT NULL,
  `quantity` int(30) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblorderitems`
--

INSERT INTO `tblorderitems` (`itemOrderID`, `productID`, `inventoryID`, `ReferenceNumber`, `productPrice`, `quantity`, `discount`, `tax`) VALUES
(503, 5481, 93, '67181744804437438', '50.00', 10, '20.00', '0.00'),
(504, 5679, 94, '67181744804437438', '26.45', 10, '20.00', '0.00'),
(505, 5677, 95, '67181744804437438', '52.90', 10, '20.00', '0.00'),
(506, 5774, 96, '67181744804437438', '4.60', 10, '20.00', '0.00'),
(507, 5639, 99, '67181744804437438', '213.00', 10, '20.00', '0.00'),
(508, 5651, 97, '67181744804437438', '4.60', 10, '20.00', '0.00'),
(509, 5267, 98, '67181744804437438', '22.50', 10, '20.00', '0.00'),
(510, 5584, 100, '67181744804437438', '52.50', 10, '20.00', '0.00'),
(511, 5454, 101, '67181744804437438', '6.00', 10, '20.00', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `tblorders`
--

CREATE TABLE `tblorders` (
  `OrderID` bigint(30) NOT NULL,
  `ReferenceNumber` varchar(300) NOT NULL,
  `CustomerCode` bigint(30) NOT NULL,
  `TotalProducts` int(10) DEFAULT NULL,
  `TotalAmount` decimal(10,2) DEFAULT NULL,
  `TotalTax` decimal(10,2) DEFAULT NULL,
  `TotalDiscount` decimal(10,2) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Time` time DEFAULT NULL,
  `Status` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblorders`
--

INSERT INTO `tblorders` (`OrderID`, `ReferenceNumber`, `CustomerCode`, `TotalProducts`, `TotalAmount`, `TotalTax`, `TotalDiscount`, `Date`, `Time`, `Status`) VALUES
(207, '67181744804437438', 0, 90, '3460.40', '0.00', '865.10', '2022-12-07', '01:42:00', 'paid');

-- --------------------------------------------------------

--
-- Table structure for table `tblpayment`
--

CREATE TABLE `tblpayment` (
  `paymentID` bigint(30) NOT NULL,
  `ReferenceNumber` varchar(300) NOT NULL,
  `CustomerCode` bigint(30) NOT NULL,
  `paymentMode` varchar(300) NOT NULL,
  `amountPaid` decimal(10,2) NOT NULL,
  `totalChange` decimal(10,2) NOT NULL,
  `paymentStatus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblpayment`
--

INSERT INTO `tblpayment` (`paymentID`, `ReferenceNumber`, `CustomerCode`, `paymentMode`, `amountPaid`, `totalChange`, `paymentStatus`) VALUES
(129, '67181744804437438', 0, 'cash', '5000.00', '1539.60', 'paid');

-- --------------------------------------------------------

--
-- Table structure for table `tblproducts`
--

CREATE TABLE `tblproducts` (
  `productID` bigint(30) NOT NULL,
  `productImage` varchar(300) DEFAULT NULL,
  `productName` varchar(200) NOT NULL,
  `productDescription` varchar(200) DEFAULT NULL,
  `productAttribute` bigint(30) NOT NULL,
  `productAttrValue` bigint(30) NOT NULL,
  `productPrice` decimal(10,2) NOT NULL,
  `productCategory` bigint(30) NOT NULL,
  `productBrand` bigint(30) NOT NULL,
  `productAvailability` varchar(300) NOT NULL,
  `productSKU` varchar(300) NOT NULL,
  `productStatus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblproducts`
--

INSERT INTO `tblproducts` (`productID`, `productImage`, `productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, `productCategory`, `productBrand`, `productAvailability`, `productSKU`, `productStatus`) VALUES
(5266, NULL, 'Acetylcysteine', 'Acetylcysteine (Dosage: 600mg)', 15, 33, '12.00', 13, 242, 'Over the Counter', 'ACETA12-D600MG-GENE-GENE', 'active'),
(5267, NULL, 'Allopurinol', 'Allopurinol (Dosage: 100mg)', 15, 31, '15.00', 13, 242, 'Prescription Drug', 'ALLOA15-D100MG-GENE-GENE', 'active'),
(5268, NULL, 'Allopurinol', 'Allopurinol (Dosage: 300mg)', 15, 32, '19.00', 13, 242, 'Over the Counter', 'ALLOA19-D300MG-GENE-GENE', 'active'),
(5269, NULL, 'Ambroxol', 'Ambroxol (Dosage: 30mg)', 15, 30, '19.00', 13, 242, 'Prescription Drug', 'AMBRA19-D30MG-GENE-GENE', 'active'),
(5270, NULL, 'Ambroxol', 'Ambroxol (Dosage: 75mg)', 15, 35, '11.00', 13, 242, 'Over the Counter', 'AMBRA11-D75MG-GENE-GENE', 'active'),
(5271, NULL, 'Ambroxol', 'Ambroxol (Dosage: 15mg/60ml)', 15, 34, '11.00', 13, 242, 'Prescription Drug', 'AMBRA11-D15MG60ML-GENE-GENE', 'active'),
(5272, NULL, 'Ambroxol drops', 'Ambroxol drops (Dosage: 15ml)', 15, 36, '23.00', 13, 242, 'Over the Counter', 'AMBRAD23-D15ML-GENE-GENE', 'active'),
(5273, NULL, 'Amlodipine', 'Amlodipine (Dosage: 5mg)', 15, 44, '1.00', 13, 242, 'Prescription Drug', 'AMLOA1-D5MG-GENE-GENE', 'active'),
(5274, NULL, 'Amlodipine ', 'Amlodipine  (Dosage: 10mg)', 15, 45, '14.00', 13, 242, 'Over the Counter', 'AMLOA14-D10MG-GENE-GENE', 'active'),
(5275, NULL, 'Amoxicillin', 'Amoxicillin (Dosage: 500mg)', 15, 78, '24.00', 13, 242, 'Over the Counter', 'AMOXA24-D500MG-GENE-GENE', 'active'),
(5276, NULL, 'Amoxicillin', 'Amoxicillin (Dosage: 125mg/60ml)', 15, 77, '18.00', 13, 242, 'Prescription Drug', 'AMOXA18-D125MG60ML-GENE-GENE', 'active'),
(5277, NULL, 'Amoxicillin', 'Amoxicillin (Dosage: 250mg/60ml)', 15, 81, '19.00', 13, 242, 'Over the Counter', 'AMOXA19-D250MG60ML-GENE-GENE', 'active'),
(5278, NULL, 'Amoxicillin drops', 'Amoxicillin drops (Dosage: 15ml)', 15, 36, '18.00', 13, 242, 'Prescription Drug', 'AMOXAD18-D15ML-GENE-GENE', 'active'),
(5279, NULL, 'Antacid', 'Antacid (Unit: 1pc)', 30, 83, '9.00', 13, 242, 'Over the Counter', 'ANTAA9-U1PC-GENE-GENE', 'active'),
(5280, NULL, 'Appetason capsule', 'Appetason capsule (Unit: 1pc)', 30, 83, '7.00', 13, 242, 'Prescription Drug', 'APPEAC7-U1PC-GENE-GENE', 'active'),
(5281, NULL, 'Appetason', 'Appetason (Dosage: 120ml)', 15, 84, '15.00', 13, 242, 'Over the Counter', 'APPEA15-D120ML-GENE-GENE', 'active'),
(5282, NULL, 'Ascorbic Acid', 'Ascorbic Acid (Dosage: 120ml)', 15, 84, '20.00', 13, 242, 'Prescription Drug', 'ASCOAA20-D120ML-GENE-GENE', 'active'),
(5283, NULL, 'Ascorbic Acid (Protec-Zinc) capsule', 'Ascorbic Acid (Protec-Zinc) capsule (Dosage: 500mg)', 15, 78, '19.00', 13, 242, 'Over the Counter', 'ASCOAAPZC19-D500MG-GENE-GENE', 'active'),
(5284, NULL, 'Ascorbic Acid Drops', 'Ascorbic Acid Drops (Dosage: 15ml)', 15, 36, '11.00', 13, 242, 'Over the Counter', 'ASCOAAD11-D15ML-GENE-GENE', 'active'),
(5285, NULL, 'Ascorbic Acid tablet', 'Ascorbic Acid tablet (Dosage: 500mg)', 15, 78, '6.00', 13, 242, 'Prescription Drug', 'ASCOAAT6-D500MG-GENE-GENE', 'active'),
(5286, NULL, 'Aspirin', 'Aspirin (Dosage: 80mg)', 15, 88, '10.00', 13, 242, 'Over the Counter', 'ASPIA10-D80MG-GENE-GENE', 'active'),
(5287, NULL, 'Atorvastatin', 'Atorvastatin (Dosage: 10mg)', 15, 45, '11.00', 13, 242, 'Prescription Drug', 'ATORA11-D10MG-GENE-GENE', 'active'),
(5288, NULL, 'Atorvastatin', 'Atorvastatin (Dosage: 20mg)', 15, 86, '21.00', 13, 242, 'Over the Counter', 'ATORA21-D20MG-GENE-GENE', 'active'),
(5289, NULL, 'Atorvastatin', 'Atorvastatin (Dosage: 40mg)', 15, 93, '7.00', 13, 242, 'Prescription Drug', 'ATORA7-D40MG-GENE-GENE', 'active'),
(5290, NULL, 'Azithromycin', 'Azithromycin (Dosage: 500mg)', 15, 78, '2.00', 13, 242, 'Over the Counter', 'AZITA2-D500MG-GENE-GENE', 'active'),
(5291, NULL, 'Betahistine', 'Betahistine (Dosage: 16mg)', 15, 94, '15.00', 13, 242, 'Prescription Drug', 'BETAB15-D16MG-GENE-GENE', 'active'),
(5292, NULL, 'Betahistine', 'Betahistine (Dosage: 24mg)', 15, 98, '23.00', 13, 242, 'Over the Counter', 'BETAB23-D24MG-GENE-GENE', 'active'),
(5293, NULL, 'Bisacodyl', 'Bisacodyl (Dosage: 5mg)', 15, 44, '20.00', 13, 242, 'Over the Counter', 'BISAB20-D5MG-GENE-GENE', 'active'),
(5294, NULL, 'Calcium + Cholecalciferol', 'Calcium + Cholecalciferol (Unit: 1pc)', 30, 83, '3.00', 13, 242, 'Prescription Drug', 'CALCCC3-U1PC-GENE-GENE', 'active'),
(5295, NULL, 'Calcium Carbonate', 'Calcium Carbonate (Unit: 1pc)', 30, 83, '13.00', 13, 242, 'Over the Counter', 'CALCCC13-U1PC-GENE-GENE', 'active'),
(5296, NULL, 'Carbamazepine', 'Carbamazepine (Dosage: 200mg)', 15, 100, '14.00', 13, 242, 'Prescription Drug', 'CARBC14-D200MG-GENE-GENE', 'active'),
(5297, NULL, 'Carbocisteine', 'Carbocisteine (Dosage: 500mg)', 15, 78, '6.00', 13, 242, 'Over the Counter', 'CARBC6-D500MG-GENE-GENE', 'active'),
(5298, NULL, 'Carbocisteine', 'Carbocisteine (Dosage: 100mg/60ml)', 15, 102, '6.00', 13, 242, 'Prescription Drug', 'CARBC6-D100MG60ML-GENE-GENE', 'active'),
(5299, NULL, 'Carbocisteine drops', 'Carbocisteine drops (Dosage: 15ml)', 15, 36, '8.00', 13, 242, 'Over the Counter', 'CARBCD8-D15ML-GENE-GENE', 'active'),
(5300, NULL, 'Carvedilol', 'Carvedilol (Dosage: 25mg)', 15, 104, '12.00', 13, 242, 'Prescription Drug', 'CARVC12-D25MG-GENE-GENE', 'active'),
(5301, NULL, 'Carvedilol', 'Carvedilol (Dosage: 6.25mg)', 15, 106, '5.00', 13, 242, 'Over the Counter', 'CARVC5-D625MG-GENE-GENE', 'active'),
(5302, NULL, 'Cefaclor', 'Cefaclor (Dosage: 125mg/60ml)', 15, 77, '18.00', 13, 242, 'Over the Counter', 'CEFAC18-D125MG60ML-GENE-GENE', 'active'),
(5303, NULL, 'Cefaclor ', 'Cefaclor  (Dosage: 250mg/60ml)', 15, 81, '3.00', 13, 242, 'Prescription Drug', 'CEFAC3-D250MG60ML-GENE-GENE', 'active'),
(5304, NULL, 'Cefalexin', 'Cefalexin (Dosage: 500mg)', 15, 78, '11.00', 13, 242, 'Over the Counter', 'CEFAC11-D500MG-GENE-GENE', 'active'),
(5305, NULL, 'Cefalexin', 'Cefalexin (Dosage: 125mg/60ml)', 15, 77, '11.00', 13, 242, 'Prescription Drug', 'CEFAC11-D125MG60ML-GENE-GENE', 'active'),
(5306, NULL, 'Cefalexin', 'Cefalexin (Dosage: 250mg/60ml)', 15, 81, '12.00', 13, 242, 'Over the Counter', 'CEFAC12-D250MG60ML-GENE-GENE', 'active'),
(5307, NULL, 'Cefalexin drops', 'Cefalexin drops (Dosage: 15ml)', 15, 36, '15.00', 13, 242, 'Prescription Drug', 'CEFACD15-D15ML-GENE-GENE', 'active'),
(5308, NULL, 'Cefixime', 'Cefixime (Dosage: 200mg)', 15, 100, '7.00', 13, 242, 'Over the Counter', 'CEFIC7-D200MG-GENE-GENE', 'active'),
(5309, NULL, 'Cefuroxime', 'Cefuroxime (Dosage: 500mg)', 15, 78, '10.00', 13, 242, 'Prescription Drug', 'CEFUC10-D500MG-GENE-GENE', 'active'),
(5310, NULL, 'Cefuroxime', 'Cefuroxime (Dosage: 70ml)', 15, 114, '4.00', 13, 242, 'Over the Counter', 'CEFUC4-D70ML-GENE-GENE', 'active'),
(5311, NULL, 'Celecoxib', 'Celecoxib (Dosage: 200mg)', 15, 100, '10.00', 13, 242, 'Over the Counter', 'CELEC10-D200MG-GENE-GENE', 'active'),
(5312, NULL, 'Celecoxib', 'Celecoxib (Dosage: 400mg)', 15, 116, '19.00', 13, 242, 'Prescription Drug', 'CELEC19-D400MG-GENE-GENE', 'active'),
(5313, NULL, 'Cetirizine', 'Cetirizine (Dosage: 10mg)', 15, 45, '17.00', 13, 242, 'Over the Counter', 'CETIC17-D10MG-GENE-GENE', 'active'),
(5314, NULL, 'Cetirizine', 'Cetirizine (Dosage: 60ml)', 15, 117, '5.00', 13, 242, 'Prescription Drug', 'CETIC5-D60ML-GENE-GENE', 'active'),
(5315, NULL, 'Cetirizine drops', 'Cetirizine drops (Dosage: 15ml)', 15, 36, '10.00', 13, 242, 'Over the Counter', 'CETICD10-D15ML-GENE-GENE', 'active'),
(5316, NULL, 'Cimetidine', 'Cimetidine (Dosage: 400mg)', 15, 116, '3.00', 13, 242, 'Prescription Drug', 'CIMEC3-D400MG-GENE-GENE', 'active'),
(5317, NULL, 'Cimetidine ', 'Cimetidine  (Dosage: 200mg)', 15, 100, '3.00', 13, 242, 'Over the Counter', 'CIMEC3-D200MG-GENE-GENE', 'active'),
(5318, NULL, 'Ciprofloxacin', 'Ciprofloxacin (Dosage: 500mg)', 15, 78, '9.00', 13, 242, 'Prescription Drug', 'CIPRC9-D500MG-GENE-GENE', 'active'),
(5319, NULL, 'Citicoline', 'Citicoline (Dosage: 500mg)', 15, 78, '11.00', 13, 242, 'Over the Counter', 'CITIC11-D500MG-GENE-GENE', 'active'),
(5320, NULL, 'Citicoline', 'Citicoline (Dosage: 1g)', 15, 124, '10.00', 13, 242, 'Over the Counter', 'CITIC10-D1G-GENE-GENE', 'active'),
(5321, NULL, 'Clarithromycin', 'Clarithromycin (Dosage: 500mg)', 15, 78, '16.00', 13, 242, 'Prescription Drug', 'CLARC16-D500MG-GENE-GENE', 'active'),
(5322, NULL, 'Clindamycin', 'Clindamycin (Dosage: 300mg)', 15, 32, '5.00', 13, 242, 'Over the Counter', 'CLINC5-D300MG-GENE-GENE', 'active'),
(5323, NULL, 'Clonidine', 'Clonidine (Dosage: 75mcg)', 15, 127, '14.00', 13, 242, 'Prescription Drug', 'CLONC14-D75MCG-GENE-GENE', 'active'),
(5324, NULL, 'Cloxacillin', 'Cloxacillin (Dosage: 500mg)', 15, 78, '3.00', 13, 242, 'Over the Counter', 'CLOXC3-D500MG-GENE-GENE', 'active'),
(5325, NULL, 'Co-amociclav', 'Co-amociclav (Dosage: 457mg)', 15, 129, '21.00', 13, 242, 'Prescription Drug', 'COAMCA21-D457MG-GENE-GENE', 'active'),
(5326, NULL, 'Co-amoxiclav', 'Co-amoxiclav (Dosage: 625mg)', 15, 130, '10.00', 13, 242, 'Over the Counter', 'COAMCA10-D625MG-GENE-GENE', 'active'),
(5327, NULL, 'Co-amoxiclav', 'Co-amoxiclav (Dosage: 312mg)', 15, 131, '12.00', 13, 242, 'Prescription Drug', 'COAMCA12-D312MG-GENE-GENE', 'active'),
(5328, NULL, 'Colchicine ', 'Colchicine  (Dosage: 500mcg)', 15, 137, '4.00', 13, 242, 'Over the Counter', 'COLCC4-D500MCG-GENE-GENE', 'active'),
(5329, NULL, 'Cotrimoxazole', 'Cotrimoxazole (Dosage: 400/80mg)', 15, 132, '13.00', 13, 242, 'Over the Counter', 'COTRC13-D40080MG-GENE-GENE', 'active'),
(5330, NULL, 'Cotrimoxazole', 'Cotrimoxazole (Dosage: 800/160mg)', 15, 136, '15.00', 13, 242, 'Prescription Drug', 'COTRC15-D800160MG-GENE-GENE', 'active'),
(5331, NULL, 'Cotrimoxazole', 'Cotrimoxazole (Dosage: 240mg/60ml)', 15, 135, '2.00', 13, 242, 'Over the Counter', 'COTRC2-D240MG60ML-GENE-GENE', 'active'),
(5332, NULL, 'Dexamethasone', 'Dexamethasone (Dosage: 500mcg)', 15, 137, '20.00', 13, 242, 'Prescription Drug', 'DEXAD20-D500MCG-GENE-GENE', 'active'),
(5333, NULL, 'Diclofenac', 'Diclofenac (Dosage: 50mg)', 15, 133, '19.00', 13, 242, 'Over the Counter', 'DICLD19-D50MG-GENE-GENE', 'active'),
(5334, NULL, 'Diclofenac', 'Diclofenac (Dosage: 100mg)', 15, 31, '21.00', 13, 242, 'Prescription Drug', 'DICLD21-D100MG-GENE-GENE', 'active'),
(5335, NULL, 'Dicycloverine', 'Dicycloverine (Dosage: 10mg)', 15, 45, '14.00', 13, 242, 'Over the Counter', 'DICYD14-D10MG-GENE-GENE', 'active'),
(5336, NULL, 'Dicycloverine', 'Dicycloverine (Dosage: 60ml)', 15, 117, '17.00', 13, 242, 'Prescription Drug', 'DICYD17-D60ML-GENE-GENE', 'active'),
(5337, NULL, 'Digoxin', 'Digoxin (Dosage: 250mcg)', 15, 141, '18.00', 13, 242, 'Over the Counter', 'DIGOD18-D250MCG-GENE-GENE', 'active'),
(5338, NULL, 'Diphenhydramine', 'Diphenhydramine (Dosage: 50mg)', 15, 133, '6.00', 13, 242, 'Over the Counter', 'DIPHD6-D50MG-GENE-GENE', 'active'),
(5339, NULL, 'Domperidone ', 'Domperidone  (Dosage: 10mg)', 15, 45, '5.00', 13, 242, 'Prescription Drug', 'DOMPD5-D10MG-GENE-GENE', 'active'),
(5340, NULL, 'Domperidone ', 'Domperidone  (Dosage: 60ml)', 15, 117, '10.00', 13, 242, 'Over the Counter', 'DOMPD10-D60ML-GENE-GENE', 'active'),
(5341, NULL, 'Enalapril', 'Enalapril (Dosage: 10mg)', 15, 45, '5.00', 13, 242, 'Prescription Drug', 'ENALE5-D10MG-GENE-GENE', 'active'),
(5342, NULL, 'Enalapril ', 'Enalapril  (Dosage: 5mg)', 15, 44, '17.00', 13, 242, 'Over the Counter', 'ENALE17-D5MG-GENE-GENE', 'active'),
(5343, NULL, 'Erythromycin', 'Erythromycin (Dosage: 500mg)', 15, 78, '9.00', 13, 242, 'Prescription Drug', 'ERYTE9-D500MG-GENE-GENE', 'active'),
(5344, NULL, 'Esomeprazole ', 'Esomeprazole  (Dosage: 40mg)', 15, 93, '3.00', 13, 242, 'Over the Counter', 'ESOME3-D40MG-GENE-GENE', 'active'),
(5345, NULL, 'Etoricoxib', 'Etoricoxib (Dosage: 120mg)', 15, 154, '4.00', 13, 242, 'Prescription Drug', 'ETORE4-D120MG-GENE-GENE', 'active'),
(5346, NULL, 'Febuxostat', 'Febuxostat (Dosage: 40mg)', 15, 93, '17.00', 13, 242, 'Over the Counter', 'FEBUF17-D40MG-GENE-GENE', 'active'),
(5347, NULL, 'Febuxostat', 'Febuxostat (Dosage: 80mg)', 15, 88, '22.00', 13, 242, 'Over the Counter', 'FEBUF22-D80MG-GENE-GENE', 'active'),
(5348, NULL, 'Felodipine', 'Felodipine (Dosage: 5mg)', 15, 44, '2.00', 13, 242, 'Prescription Drug', 'FELOF2-D5MG-GENE-GENE', 'active'),
(5349, NULL, 'Ferrous sulfate', 'Ferrous sulfate (Dosage: 325mg)', 15, 149, '22.00', 13, 242, 'Over the Counter', 'FERRFS22-D325MG-GENE-GENE', 'active'),
(5350, NULL, 'Folic Acid', 'Folic Acid (Unit: 1pc)', 30, 83, '23.00', 13, 242, 'Prescription Drug', 'FOLIFA23-U1PC-GENE-GENE', 'active'),
(5351, NULL, 'Foralivit', 'Foralivit (Dosage: 5mg)', 15, 44, '12.00', 13, 242, 'Over the Counter', 'FORAF12-D5MG-GENE-GENE', 'active'),
(5352, NULL, 'Furosemide', 'Furosemide (Dosage: 20mg)', 15, 86, '19.00', 13, 242, 'Prescription Drug', 'FUROF19-D20MG-GENE-GENE', 'active'),
(5353, NULL, 'Furosemide', 'Furosemide (Dosage: 40mg)', 15, 93, '5.00', 13, 242, 'Over the Counter', 'FUROF5-D40MG-GENE-GENE', 'active'),
(5354, NULL, 'Gliclazide', 'Gliclazide (Dosage: 30mg)', 15, 30, '4.00', 13, 242, 'Prescription Drug', 'GLICG4-D30MG-GENE-GENE', 'active'),
(5355, NULL, 'Gliclazide', 'Gliclazide (Dosage: 60mg)', 15, 159, '16.00', 13, 242, 'Over the Counter', 'GLICG16-D60MG-GENE-GENE', 'active'),
(5356, NULL, 'Gliclazide', 'Gliclazide (Dosage: 80mg)', 15, 88, '10.00', 13, 242, 'Over the Counter', 'GLICG10-D80MG-GENE-GENE', 'active'),
(5357, NULL, 'Glimepiride', 'Glimepiride (Dosage: 3mg)', 15, 160, '7.00', 13, 242, 'Prescription Drug', 'GLIMG7-D3MG-GENE-GENE', 'active'),
(5358, NULL, 'Glimepiride', 'Glimepiride (Dosage: 4mg)', 15, 161, '20.00', 13, 242, 'Over the Counter', 'GLIMG20-D4MG-GENE-GENE', 'active'),
(5359, NULL, 'Guaifenesin', 'Guaifenesin (Dosage: 100mg)', 15, 31, '17.00', 13, 242, 'Prescription Drug', 'GUAIG17-D100MG-GENE-GENE', 'active'),
(5360, NULL, 'Guaifenesin', 'Guaifenesin (Dosage: 60ml)', 15, 117, '10.00', 13, 242, 'Over the Counter', 'GUAIG10-D60ML-GENE-GENE', 'active'),
(5361, NULL, 'Hyoscine n butylbromide', 'Hyoscine n butylbromide (Dosage: 60ml)', 15, 117, '13.00', 13, 242, 'Prescription Drug', 'HYOSHNB13-D60ML-GENE-GENE', 'active'),
(5362, NULL, 'Hyoscine N-ButylBromide', 'Hyoscine N-ButylBromide (Dosage: 10mg)', 15, 45, '10.00', 13, 242, 'Over the Counter', 'HYOSHNB10-D10MG-GENE-GENE', 'active'),
(5363, NULL, 'Ibuprofen', 'Ibuprofen (Dosage: 200mg)', 15, 100, '10.00', 13, 242, 'Prescription Drug', 'IBUPI10-D200MG-GENE-GENE', 'active'),
(5364, NULL, 'Ibuprofen', 'Ibuprofen (Dosage: 400mg)', 15, 116, '3.00', 13, 242, 'Over the Counter', 'IBUPI3-D400MG-GENE-GENE', 'active'),
(5365, NULL, 'Irbesartan ', 'Irbesartan  (Dosage: 150mg)', 15, 168, '13.00', 13, 242, 'Over the Counter', 'IRBEI13-D150MG-GENE-GENE', 'active'),
(5366, NULL, 'Irbesartan ', 'Irbesartan  (Dosage: 300mg)', 15, 32, '17.00', 13, 242, 'Prescription Drug', 'IRBEI17-D300MG-GENE-GENE', 'active'),
(5367, NULL, 'Isosorbide Dinitrate', 'Isosorbide Dinitrate (Dosage: 10mg)', 15, 45, '13.00', 13, 242, 'Over the Counter', 'ISOSID13-D10MG-GENE-GENE', 'active'),
(5368, NULL, 'Isosorbide Mononitrate', 'Isosorbide Mononitrate (Dosage: 30mg)', 15, 30, '5.00', 13, 242, 'Prescription Drug', 'ISOSIM5-D30MG-GENE-GENE', 'active'),
(5369, NULL, 'Isosorbide Mononitrate', 'Isosorbide Mononitrate (Dosage: 60mg)', 15, 159, '4.00', 13, 242, 'Over the Counter', 'ISOSIM4-D60MG-GENE-GENE', 'active'),
(5370, NULL, 'Ketoanalogues', 'Ketoanalogues (Unit: 1pc)', 30, 83, '21.00', 13, 242, 'Prescription Drug', 'KETOK21-U1PC-GENE-GENE', 'active'),
(5371, NULL, 'Lagundi', 'Lagundi (Dosage: 600mg)', 15, 33, '18.00', 13, 242, 'Over the Counter', 'LAGUL18-D600MG-GENE-GENE', 'active'),
(5372, NULL, 'Lagundi Kids', 'Lagundi Kids (Dosage: 60ml)', 15, 117, '4.00', 13, 242, 'Prescription Drug', 'LAGULK4-D60ML-GENE-GENE', 'active'),
(5373, NULL, 'Levocetirizine', 'Levocetirizine (Dosage: 5mg)', 15, 44, '18.00', 13, 242, 'Over the Counter', 'LEVOL18-D5MG-GENE-GENE', 'active'),
(5374, NULL, 'Levofloxacin', 'Levofloxacin (Dosage: 500mg)', 15, 78, '11.00', 13, 242, 'Over the Counter', 'LEVOL11-D500MG-GENE-GENE', 'active'),
(5375, NULL, 'Levothyroxine ', 'Levothyroxine  (Dosage: 50mcg)', 15, 180, '12.00', 13, 242, 'Prescription Drug', 'LEVOL12-D50MCG-GENE-GENE', 'active'),
(5376, NULL, 'Loperamide', 'Loperamide (Dosage: 2mg)', 15, 182, '14.00', 13, 242, 'Over the Counter', 'LOPEL14-D2MG-GENE-GENE', 'active'),
(5377, NULL, 'Loratadine', 'Loratadine (Dosage: 10mg)', 15, 45, '15.00', 13, 242, 'Prescription Drug', 'LORAL15-D10MG-GENE-GENE', 'active'),
(5378, NULL, 'Losartan', 'Losartan (Dosage: 50mg)', 15, 133, '15.00', 13, 242, 'Over the Counter', 'LOSAL15-D50MG-GENE-GENE', 'active'),
(5379, NULL, 'Losartan', 'Losartan (Dosage: 100mg)', 15, 31, '5.00', 13, 242, 'Prescription Drug', 'LOSAL5-D100MG-GENE-GENE', 'active'),
(5380, NULL, 'Losartan + Amlodipine', 'Losartan + Amlodipine (Dosage: 5mg/50mg)', 15, 184, '18.00', 13, 242, 'Over the Counter', 'LOSALA18-D5MG50MG-GENE-GENE', 'active'),
(5381, NULL, 'Losartan + HCTZ', 'Losartan + HCTZ (Dosage: 50mg/12.5mg)', 15, 185, '3.00', 13, 242, 'Prescription Drug', 'LOSALH3-D50MG125MG-GENE-GENE', 'active'),
(5382, NULL, 'Losartan + HCTZ', 'Losartan + HCTZ (Dosage: 100mmg/25mg)', 15, 186, '3.00', 13, 242, 'Over the Counter', 'LOSALH3-D100MMG25MG-GENE-GENE', 'active'),
(5383, NULL, 'Mebendazole', 'Mebendazole (Dosage: 500mg)', 15, 78, '13.00', 13, 242, 'Over the Counter', 'MEBEM13-D500MG-GENE-GENE', 'active'),
(5384, NULL, 'Mebendazole', 'Mebendazole (Dosage: 60ml)', 15, 117, '22.00', 13, 242, 'Prescription Drug', 'MEBEM22-D60ML-GENE-GENE', 'active'),
(5385, NULL, 'Meclizine ', 'Meclizine  (Dosage: 25mg)', 15, 104, '17.00', 13, 242, 'Over the Counter', 'MECLM17-D25MG-GENE-GENE', 'active'),
(5386, NULL, 'Mefenamic', 'Mefenamic (Dosage: 60ml)', 15, 117, '9.00', 13, 242, 'Prescription Drug', 'MEFEM9-D60ML-GENE-GENE', 'active'),
(5387, NULL, 'Mefenamic Capsule', 'Mefenamic Capsule (Dosage: 500mg)', 15, 78, '16.00', 13, 242, 'Over the Counter', 'MEFEMC16-D500MG-GENE-GENE', 'active'),
(5388, NULL, 'Mefenamic Tablet', 'Mefenamic Tablet (Dosage: 500mg)', 15, 78, '4.00', 13, 242, 'Prescription Drug', 'MEFEMT4-D500MG-GENE-GENE', 'active'),
(5389, NULL, 'Melatonin', 'Melatonin (Unit: 1pc)', 30, 83, '8.00', 13, 242, 'Over the Counter', 'MELAM8-U1PC-GENE-GENE', 'active'),
(5390, NULL, 'Meloxicam', 'Meloxicam (Dosage: 15mg)', 15, 194, '7.00', 13, 242, 'Prescription Drug', 'MELOM7-D15MG-GENE-GENE', 'active'),
(5391, NULL, 'Metformin', 'Metformin (Dosage: 500mg)', 15, 78, '5.00', 13, 242, 'Over the Counter', 'METFM5-D500MG-GENE-GENE', 'active'),
(5392, NULL, 'Methylprednisolone', 'Methylprednisolone (Dosage: 16mg)', 15, 94, '15.00', 13, 242, 'Over the Counter', 'METHM15-D16MG-GENE-GENE', 'active'),
(5393, NULL, 'Metoclopramide', 'Metoclopramide (Dosage: 10mg)', 15, 45, '16.00', 13, 242, 'Prescription Drug', 'METOM16-D10MG-GENE-GENE', 'active'),
(5394, NULL, 'Metoclopramide', 'Metoclopramide (Dosage: 60ml)', 15, 117, '17.00', 13, 242, 'Over the Counter', 'METOM17-D60ML-GENE-GENE', 'active'),
(5395, NULL, 'Metoprolol', 'Metoprolol (Dosage: 50mg)', 15, 133, '14.00', 13, 242, 'Prescription Drug', 'METOM14-D50MG-GENE-GENE', 'active'),
(5396, NULL, 'Metoprolol', 'Metoprolol (Dosage: 100mg)', 15, 31, '4.00', 13, 242, 'Over the Counter', 'METOM4-D100MG-GENE-GENE', 'active'),
(5397, NULL, 'Metronidazole', 'Metronidazole (Dosage: 500mg)', 15, 78, '6.00', 13, 242, 'Prescription Drug', 'METRM6-D500MG-GENE-GENE', 'active'),
(5398, NULL, 'Metronidazole', 'Metronidazole (Dosage: 60ml)', 15, 117, '20.00', 13, 242, 'Over the Counter', 'METRM20-D60ML-GENE-GENE', 'active'),
(5399, NULL, 'Montelukast', 'Montelukast (Dosage: 10mg)', 15, 45, '2.00', 13, 242, 'Prescription Drug', 'MONTM2-D10MG-GENE-GENE', 'active'),
(5400, NULL, 'Multivitamins', 'Multivitamins (Dosage: 1pc)', 15, 83, '9.00', 13, 242, 'Over the Counter', 'MULTM9-D1PC-GENE-GENE', 'active'),
(5401, NULL, 'Naproxen', 'Naproxen (Dosage: 500mg)', 15, 78, '19.00', 13, 242, 'Over the Counter', 'NAPRN19-D500MG-GENE-GENE', 'active'),
(5402, NULL, 'Nebivolol', 'Nebivolol (Dosage: 5mg)', 15, 44, '17.00', 13, 242, 'Prescription Drug', 'NEBIN17-D5MG-GENE-GENE', 'active'),
(5403, NULL, 'Nifedipine', 'Nifedipine (Dosage: 5mg)', 15, 44, '5.00', 13, 242, 'Over the Counter', 'NIFEN5-D5MG-GENE-GENE', 'active'),
(5404, NULL, 'Nifedipine', 'Nifedipine (Dosage: 10mg)', 15, 45, '7.00', 13, 242, 'Prescription Drug', 'NIFEN7-D10MG-GENE-GENE', 'active'),
(5405, NULL, 'Omeprazole', 'Omeprazole (Dosage: 20mg)', 15, 86, '8.00', 13, 242, 'Over the Counter', 'OMEPO8-D20MG-GENE-GENE', 'active'),
(5406, NULL, 'Omeprazole', 'Omeprazole (Dosage: 40mg)', 15, 93, '15.00', 13, 242, 'Prescription Drug', 'OMEPO15-D40MG-GENE-GENE', 'active'),
(5407, NULL, 'ORS', 'ORS (Dosage: 1pc)', 15, 83, '12.00', 13, 242, 'Over the Counter', 'ORSO12-D1PC-GENE-GENE', 'active'),
(5408, NULL, 'Pantoprazole', 'Pantoprazole (Dosage: 40mg)', 15, 93, '6.00', 13, 242, 'Prescription Drug', 'PANTP6-D40MG-GENE-GENE', 'active'),
(5409, NULL, 'Paracetamol', 'Paracetamol (Dosage: 500mg)', 15, 78, '22.00', 13, 242, 'Over the Counter', 'PARAP22-D500MG-GENE-GENE', 'active'),
(5410, NULL, 'Paracetamol', 'Paracetamol (Dosage: 250mg/60ml)', 15, 81, '12.00', 13, 242, 'Over the Counter', 'PARAP12-D250MG60ML-GENE-GENE', 'active'),
(5411, NULL, 'Paracetamol ', 'Paracetamol  (Dosage: 125mg/60ml)', 15, 77, '14.00', 13, 242, 'Prescription Drug', 'PARAP14-D125MG60ML-GENE-GENE', 'active'),
(5412, NULL, 'Paracetamol + Tramadol', 'Paracetamol + Tramadol (Dosage: 325mg/37.5mg)', 15, 215, '15.00', 13, 242, 'Over the Counter', 'PARAPT15-D325MG375MG-GENE-GENE', 'active'),
(5413, NULL, 'Paracetamol drops', 'Paracetamol drops (Dosage: 100mg/15ml)', 15, 217, '0.00', 13, 242, 'Prescription Drug', 'PARAPD0-D100MG15ML-GENE-GENE', 'active'),
(5414, NULL, 'Piroxicam', 'Piroxicam (Dosage: 20mg)', 15, 86, '19.00', 13, 242, 'Over the Counter', 'PIROP19-D20MG-GENE-GENE', 'active'),
(5415, NULL, 'Potassium Citrate', 'Potassium Citrate (Dosage: 10mEq)', 15, 218, '0.00', 13, 242, 'Prescription Drug', 'POTAPC0-D10MQ-GENE-GENE', 'active'),
(5416, NULL, 'Prednisone', 'Prednisone (Dosage: 5mg)', 15, 44, '6.00', 13, 242, 'Over the Counter', 'PREDP6-D5MG-GENE-GENE', 'active'),
(5417, NULL, 'Prednisone', 'Prednisone (Dosage: 10mg)', 15, 45, '19.00', 13, 242, 'Prescription Drug', 'PREDP19-D10MG-GENE-GENE', 'active'),
(5418, NULL, 'Prednisone', 'Prednisone (Dosage: 20mg)', 15, 86, '11.00', 13, 242, 'Over the Counter', 'PREDP11-D20MG-GENE-GENE', 'active'),
(5419, NULL, 'Prednisone', 'Prednisone (Dosage: 60ml)', 15, 117, '2.00', 13, 242, 'Over the Counter', 'PREDP2-D60ML-GENE-GENE', 'active'),
(5420, NULL, 'Pregabalin ', 'Pregabalin  (Dosage: 75mg)', 15, 35, '21.00', 13, 242, 'Prescription Drug', 'PREGP21-D75MG-GENE-GENE', 'active'),
(5421, NULL, 'Propranolol', 'Propranolol (Dosage: 10mg)', 15, 45, '21.00', 13, 242, 'Over the Counter', 'PROPP21-D10MG-GENE-GENE', 'active'),
(5422, NULL, 'Quadmax', 'Quadmax (Unit: 1pc)', 30, 83, '18.00', 13, 242, 'Prescription Drug', 'QUADQ18-U1PC-GENE-GENE', 'active'),
(5423, NULL, 'Ranitidine ', 'Ranitidine  (Dosage: 150mg)', 15, 168, '9.00', 13, 242, 'Over the Counter', 'RANIR9-D150MG-GENE-GENE', 'active'),
(5424, NULL, 'Ranitidine ', 'Ranitidine  (Dosage: 300mg)', 15, 32, '16.00', 13, 242, 'Prescription Drug', 'RANIR16-D300MG-GENE-GENE', 'active'),
(5425, NULL, 'Rosuvastatin', 'Rosuvastatin (Dosage: 10mg)', 15, 45, '8.00', 13, 242, 'Over the Counter', 'ROSUR8-D10MG-GENE-GENE', 'active'),
(5426, NULL, 'Rosuvastatin', 'Rosuvastatin (Dosage: 20mg)', 15, 86, '14.00', 13, 242, 'Prescription Drug', 'ROSUR14-D20MG-GENE-GENE', 'active'),
(5427, NULL, 'Salbutamol', 'Salbutamol (Dosage: 60ml)', 15, 117, '3.00', 13, 242, 'Over the Counter', 'SALBS3-D60ML-GENE-GENE', 'active'),
(5428, NULL, 'Salbutamol Inhaler', 'Salbutamol Inhaler (Dosage: 100mcg)', 15, 234, '18.00', 13, 242, 'Over the Counter', 'SALBSI18-D100MCG-GENE-GENE', 'active'),
(5429, NULL, 'Salbutamol nebule', 'Salbutamol nebule (Dosage: 1mg/1ml)', 15, 235, '5.00', 13, 242, 'Prescription Drug', 'SALBSN5-D1MG1ML-GENE-GENE', 'active'),
(5430, NULL, 'Salbutamol tablet', 'Salbutamol tablet (Dosage: 2mg)', 15, 182, '9.00', 13, 242, 'Over the Counter', 'SALBST9-D2MG-GENE-GENE', 'active'),
(5431, NULL, 'Salbutamol tablet', 'Salbutamol tablet (Dosage: 4mg)', 15, 161, '9.00', 13, 242, 'Prescription Drug', 'SALBST9-D4MG-GENE-GENE', 'active'),
(5432, NULL, 'Sambong', 'Sambong (Dosage: 500mg)', 15, 78, '10.00', 13, 242, 'Over the Counter', 'SAMBS10-D500MG-GENE-GENE', 'active'),
(5433, NULL, 'Simvastatin', 'Simvastatin (Dosage: 10mg)', 15, 45, '10.00', 13, 242, 'Prescription Drug', 'SIMVS10-D10MG-GENE-GENE', 'active'),
(5434, NULL, 'Simvastatin', 'Simvastatin (Dosage: 20mg)', 15, 86, '18.00', 13, 242, 'Over the Counter', 'SIMVS18-D20MG-GENE-GENE', 'active'),
(5435, NULL, 'Spironolactone', 'Spironolactone (Dosage: 25mg)', 15, 104, '6.00', 13, 242, 'Prescription Drug', 'SPIRS6-D25MG-GENE-GENE', 'active'),
(5436, NULL, 'Symdex', 'Symdex (Dosage: 60ml)', 15, 117, '9.00', 13, 242, 'Over the Counter', 'SYMDS9-D60ML-GENE-GENE', 'active'),
(5437, NULL, 'Symdex drops', 'Symdex drops (Dosage: 15ml)', 15, 36, '23.00', 13, 242, 'Over the Counter', 'SYMDSD23-D15ML-GENE-GENE', 'active'),
(5438, NULL, 'Symdex Forte tablet', 'Symdex Forte tablet (Unit: 1pc)', 30, 83, '20.00', 13, 242, 'Prescription Drug', 'SYMDSFT20-U1PC-GENE-GENE', 'active'),
(5439, NULL, 'Symdex tablet', 'Symdex tablet (Dosage: 25mg)', 15, 104, '18.00', 13, 242, 'Over the Counter', 'SYMDST18-D25MG-GENE-GENE', 'active'),
(5440, NULL, 'Symdex tablet', 'Symdex tablet (Dosage: 2mg)', 15, 182, '4.00', 13, 242, 'Prescription Drug', 'SYMDST4-D2MG-GENE-GENE', 'active'),
(5441, NULL, 'Symdex tablet', 'Symdex tablet (Dosage: 325mg)', 15, 149, '25.00', 13, 242, 'Over the Counter', 'SYMDST25-D325MG-GENE-GENE', 'active'),
(5442, NULL, 'Telmisartan', 'Telmisartan (Dosage: 40mg)', 15, 93, '20.00', 13, 242, 'Prescription Drug', 'TELMT20-D40MG-GENE-GENE', 'active'),
(5443, NULL, 'Telmisartan', 'Telmisartan (Dosage: 80mg)', 15, 88, '21.00', 13, 242, 'Over the Counter', 'TELMT21-D80MG-GENE-GENE', 'active'),
(5444, NULL, 'Tramadol', 'Tramadol (Dosage: 50mg)', 15, 133, '4.00', 13, 242, 'Prescription Drug', 'TRAMT4-D50MG-GENE-GENE', 'active'),
(5445, NULL, 'Tranexamic', 'Tranexamic (Dosage: 500mg)', 15, 78, '10.00', 13, 242, 'Over the Counter', 'TRANT10-D500MG-GENE-GENE', 'active'),
(5446, NULL, 'Trimetazidine', 'Trimetazidine (Dosage: 35mg)', 15, 249, '6.00', 13, 242, 'Over the Counter', 'TRIMT6-D35MG-GENE-GENE', 'active'),
(5447, NULL, 'Vitamin B (Amcovit B) Capsule', 'Vitamin B (Amcovit B) Capsule (Dosage: 300mg/100mg/100mcg)', 15, 252, '17.00', 13, 242, 'Prescription Drug', 'VITAVBABC17-D300MG100MG100MCG-GENE-GENE', 'active'),
(5448, NULL, 'Vitamin B (Amcovit B) Tablet', 'Vitamin B (Amcovit B) Tablet (Dosage: 100mg/10mg/50mcg)', 15, 253, '4.00', 13, 242, 'Over the Counter', 'VITAVBABT4-D100MG10MG50MCG-GENE-GENE', 'active'),
(5449, NULL, 'Vitamin B (Neuronerve)', 'Vitamin B (Neuronerve) (Unit: 1pcs)', 30, 255, '15.00', 13, 242, 'Prescription Drug', 'VITAVBN15-U1PCS-GENE-GENE', 'active'),
(5450, NULL, 'Vitamin B (Revitaplex)', 'Vitamin B (Revitaplex) (Unit: 1pcs)', 30, 255, '4.00', 13, 242, 'Over the Counter', 'VITAVBR4-U1PCS-GENE-GENE', 'active'),
(5451, NULL, 'Biguerlai Tea', 'Biguerlai Tea (Unit: 1pcs)', 30, 255, '9.00', 1187, 419, 'Over the Counter', 'BIGUBT9-U1PCS-BIGU-FOOD', 'active'),
(5452, NULL, 'Biofitea', 'Biofitea (Unit: 1pcs)', 30, 255, '13.00', 1187, 420, 'Over the Counter', 'BIOFB13-U1PCS-BIOF-FOOD', 'active'),
(5453, NULL, 'C-lium Fibre Capsule', 'C-lium Fibre Capsule (Unit: 1pcs)', 30, 255, '12.00', 1187, 422, 'Over the Counter', 'CLIUCLFC12-U1PCS-C-LI-FOOD', 'active'),
(5454, NULL, 'C-lium Fibre Husk', 'C-lium Fibre Husk (Unit: 1pcs)', 30, 255, '4.00', 1187, 422, 'Over the Counter', 'CLIUCLFH4-U1PCS-C-LI-FOOD', 'active'),
(5455, NULL, 'Eyeberry', 'Eyeberry (Unit: 1pcs)', 30, 255, '11.00', 1187, 423, 'Over the Counter', 'EYEBE11-U1PCS-EYEB-FOOD', 'active'),
(5456, NULL, 'Honey Big', 'Honey Big (Unit: 1pcs)', 30, 255, '9.00', 1187, 424, 'Over the Counter', 'HONEHB9-U1PCS-HONE-FOOD', 'active'),
(5457, NULL, 'Honey Medium', 'Honey Medium (Unit: 1pcs)', 30, 255, '5.00', 1187, 424, 'Over the Counter', 'HONEHM5-U1PCS-HONE-FOOD', 'active'),
(5458, NULL, 'Honey Small', 'Honey Small (Unit: 1pcs)', 30, 255, '15.00', 1187, 424, 'Over the Counter', 'HONEHS15-U1PCS-HONE-FOOD', 'active'),
(5459, NULL, 'Kidney Care', 'Kidney Care (Unit: 1pcs)', 30, 255, '25.00', 1187, 431, 'Over the Counter', 'KIDNKC25-U1PCS-KIDN-FOOD', 'active'),
(5460, NULL, 'Lipton Green tea', 'Lipton Green tea (Unit: 1pcs)', 30, 255, '3.00', 1187, 427, 'Over the Counter', 'LIPTLGT3-U1PCS-LIPT-FOOD', 'active'),
(5461, NULL, 'Lipton Yellow label', 'Lipton Yellow label (Unit: 1pcs)', 30, 255, '8.00', 1187, 427, 'Over the Counter', 'LIPTLYL8-U1PCS-LIPT-FOOD', 'active'),
(5462, NULL, 'Lola Remedios', 'Lola Remedios (Unit: 1pcs)', 30, 255, '15.00', 1187, 426, 'Over the Counter', 'LOLALR15-U1PCS-LOLA-FOOD', 'active'),
(5463, NULL, 'Malunggay Capsule', 'Malunggay Capsule (Unit: 1pcs)', 30, 255, '8.00', 1187, 425, 'Over the Counter', 'MALUMC8-U1PCS-MALU-FOOD', 'active'),
(5464, NULL, 'MX3 Capsule', 'MX3 Capsule (Unit: 1pcs)', 30, 255, '8.00', 1187, 432, 'Over the Counter', 'MX3CMC8-U1PCS-MX3-FOOD', 'active'),
(5465, NULL, 'MX3 Coffee', 'MX3 Coffee (Unit: 1pcs)', 30, 255, '16.00', 1187, 432, 'Over the Counter', 'MX3CMC16-U1PCS-MX3-FOOD', 'active'),
(5466, NULL, 'Optein', 'Optein (Unit: 1pcs)', 30, 255, '2.00', 1187, 436, 'Over the Counter', 'OPTEO2-U1PCS-OPTE-FOOD', 'active'),
(5467, NULL, 'Sambong Tea', 'Sambong Tea (Unit: 1pcs)', 30, 255, '6.00', 1187, 434, 'Over the Counter', 'SAMBST6-U1PCS-SAMB-FOOD', 'active'),
(5468, NULL, 'Silymarin Capsule', 'Silymarin Capsule (Unit: 1pcs)', 30, 255, '13.00', 1187, 433, 'Over the Counter', 'SILYSC13-U1PCS-SILY-FOOD', 'active'),
(5469, NULL, 'Taheboo Capsule', 'Taheboo Capsule (Unit: 1pcs)', 30, 255, '9.00', 1187, 442, 'Over the Counter', 'TAHETC9-U1PCS-TAHE-FOOD', 'active'),
(5470, NULL, 'Turmeric Tea', 'Turmeric Tea (Unit: 1pcs)', 30, 255, '9.00', 1187, 440, 'Over the Counter', 'TURMTT9-U1PCS-TURM-FOOD', 'active'),
(5471, NULL, 'Xanthone Plus', 'Xanthone Plus (Unit: 1pcs)', 30, 255, '38.00', 1187, 438, 'Over the Counter', 'XANTXP38-U1PCS-XANT-FOOD', 'active'),
(5472, NULL, 'Xanthone Plus Gold', 'Xanthone Plus Gold (Unit: 1pcs)', 30, 255, '43.00', 1187, 438, 'Over the Counter', 'XANTXPG43-U1PCS-XANT-FOOD', 'active'),
(5473, NULL, 'Aceite de Alcamporado', 'Aceite de Alcamporado (Unit: 25ml)', 30, 275, '25.00', 16, 437, 'Over the Counter', 'ACEIADA25-U25ML-ACEI-OINT', 'active'),
(5474, NULL, 'Aceite de Alcamporado', 'Aceite de Alcamporado (Unit: 50ml)', 30, 276, '46.00', 16, 437, 'Over the Counter', 'ACEIADA46-U50ML-ACEI-OINT', 'active'),
(5475, NULL, 'Aceite de Manzanilla', 'Aceite de Manzanilla (Unit: 25ml)', 30, 275, '14.00', 16, 437, 'Over the Counter', 'ACEIADM14-U25ML-ACEI-OINT', 'active'),
(5476, NULL, 'Aceite de Manzanilla', 'Aceite de Manzanilla (Unit: 50ml)', 30, 276, '29.00', 16, 437, 'Over the Counter', 'ACEIADM29-U50ML-ACEI-OINT', 'active'),
(5477, NULL, 'Aceite de Manzanilla', 'Aceite de Manzanilla (Unit: 100ml)', 30, 57, '45.00', 16, 437, 'Over the Counter', 'ACEIADM45-U100ML-ACEI-OINT', 'active'),
(5478, NULL, 'Betamethasone', 'Betamethasone (Unit: 1pcs)', 30, 255, '34.00', 16, 444, 'Over the Counter', 'BETAB34-U1PCS-BETA-OINT', 'active'),
(5479, NULL, 'Bioderm', 'Bioderm (Unit: 5g)', 30, 283, '34.00', 16, 447, 'Over the Counter', 'BIODB34-U5G-BIOD-OINT', 'active'),
(5480, NULL, 'Bioderm', 'Bioderm (Unit: 15g)', 30, 285, '32.00', 16, 447, 'Over the Counter', 'BIODB32-U15G-BIOD-OINT', 'active'),
(5481, NULL, 'BL cream', 'BL cream (Unit: 1pcs)', 30, 255, '26.00', 16, 448, 'Over the Counter', 'BLCRBC26-U1PCS-BL-OINT', 'active'),
(5482, NULL, 'Calmoseptine', 'Calmoseptine (Unit: 1pcs)', 30, 255, '11.00', 16, 449, 'Over the Counter', 'CALMC11-U1PCS-CALM-OINT', 'active'),
(5483, NULL, 'Chili Plater', 'Chili Plater (Unit: 1pcs)', 30, 255, '16.00', 16, 451, 'Over the Counter', 'CHILCP16-U1PCS-CHIL-OINT', 'active'),
(5484, NULL, 'Clobetasol', 'Clobetasol (Unit: 1pcs)', 30, 255, '42.00', 16, 454, 'Over the Counter', 'CLOBC42-U1PCS-CLOB-OINT', 'active'),
(5485, NULL, 'Clobetasol (Dermovate)', 'Clobetasol (Dermovate) (Unit: 1pcs)', 30, 255, '24.00', 16, 454, 'Over the Counter', 'CLOBCD24-U1PCS-CLOB-OINT', 'active'),
(5486, NULL, 'Clotrimazole', 'Clotrimazole (Unit: 1pcs)', 30, 255, '37.00', 16, 455, 'Over the Counter', 'CLOTC37-U1PCS-CLOT-OINT', 'active'),
(5487, NULL, 'Clotrimazole (Canesten)', 'Clotrimazole (Canesten) (Unit: 1pcs)', 30, 255, '19.00', 16, 455, 'Over the Counter', 'CLOTCC19-U1PCS-CLOT-OINT', 'active'),
(5488, NULL, 'Dequadin', 'Dequadin (Unit: 1pcs)', 30, 255, '30.00', 16, 456, 'Over the Counter', 'DEQUD30-U1PCS-DEQU-OINT', 'active'),
(5489, NULL, 'Difflam tablet', 'Difflam tablet (Unit: 1pcs)', 30, 255, '40.00', 16, 457, 'Over the Counter', 'DIFFDT40-U1PCS-DIFF-OINT', 'active'),
(5490, NULL, 'Efficascent Extra Strength', 'Efficascent Extra Strength (Unit: 25ml)', 30, 275, '28.00', 16, 462, 'Over the Counter', 'EFFIEES28-U25ML-EFFI-OINT', 'active'),
(5491, NULL, 'Efficascent Extra Strength', 'Efficascent Extra Strength (Unit: 50ml)', 30, 276, '32.00', 16, 462, 'Over the Counter', 'EFFIEES32-U50ML-EFFI-OINT', 'active'),
(5492, NULL, 'Efficascent Extra Strength', 'Efficascent Extra Strength (Unit: 100ml)', 30, 57, '27.00', 16, 462, 'Over the Counter', 'EFFIEES27-U100ML-EFFI-OINT', 'active'),
(5493, NULL, 'Efficascent Extreme', 'Efficascent Extreme (Unit: 25ml)', 30, 275, '43.00', 16, 462, 'Over the Counter', 'EFFIEE43-U25ML-EFFI-OINT', 'active'),
(5494, NULL, 'Efficascent Extreme', 'Efficascent Extreme (Unit: 50ml)', 30, 276, '10.00', 16, 462, 'Over the Counter', 'EFFIEE10-U50ML-EFFI-OINT', 'active'),
(5495, NULL, 'Efficascent Extreme', 'Efficascent Extreme (Unit: 100ml)', 30, 57, '41.00', 16, 462, 'Over the Counter', 'EFFIEE41-U100ML-EFFI-OINT', 'active'),
(5496, NULL, 'Efficascent ointment', 'Efficascent ointment (Unit: 1pcs)', 30, 255, '32.00', 16, 462, 'Over the Counter', 'EFFIEO32-U1PCS-EFFI-OINT', 'active'),
(5497, NULL, 'Efficascent Regular', 'Efficascent Regular (Unit: 25ml)', 30, 275, '23.00', 16, 462, 'Over the Counter', 'EFFIER23-U25ML-EFFI-OINT', 'active'),
(5498, NULL, 'Efficascent Regular', 'Efficascent Regular (Unit: 50ml)', 30, 276, '33.00', 16, 462, 'Over the Counter', 'EFFIER33-U50ML-EFFI-OINT', 'active'),
(5499, NULL, 'Efficascent Regular', 'Efficascent Regular (Unit: 100ml)', 30, 57, '34.00', 16, 462, 'Over the Counter', 'EFFIER34-U100ML-EFFI-OINT', 'active'),
(5500, NULL, 'Eye mo Blue', 'Eye mo Blue (Unit: 1pcs)', 30, 255, '41.00', 16, 468, 'Over the Counter', 'EYEMEMB41-U1PCS-EYE-OINT', 'active'),
(5501, NULL, 'Eye mo Red', 'Eye mo Red (Unit: 1pcs)', 30, 255, '46.00', 16, 468, 'Over the Counter', 'EYEMEMR46-U1PCS-EYE-OINT', 'active'),
(5502, NULL, 'Fungisol', 'Fungisol (Unit: 4ml)', 30, 309, '20.00', 16, 470, 'Over the Counter', 'FUNGF20-U4ML-FUNG-OINT', 'active'),
(5503, NULL, 'Hydrocortisone', 'Hydrocortisone (Unit: 1pcs)', 30, 255, '24.00', 16, 471, 'Over the Counter', 'HYDRH24-U1PCS-HYDR-OINT', 'active'),
(5504, NULL, 'Katialis', 'Katialis (Unit: 15g)', 30, 285, '15.00', 16, 472, 'Over the Counter', 'KATIK15-U15G-KATI-OINT', 'active'),
(5505, NULL, 'Katialis', 'Katialis (Unit: 30g)', 30, 311, '41.00', 16, 472, 'Over the Counter', 'KATIK41-U30G-KATI-OINT', 'active'),
(5506, NULL, 'Katialis ', 'Katialis  (Unit: 5g)', 30, 283, '16.00', 16, 472, 'Over the Counter', 'KATIK16-U5G-KATI-OINT', 'active'),
(5507, NULL, 'Katinko', 'Katinko (Unit: 10g)', 30, 59, '20.00', 16, 475, 'Over the Counter', 'KATIK20-U10G-KATI-OINT', 'active'),
(5508, NULL, 'Katinko', 'Katinko (Unit: 30g)', 30, 311, '47.00', 16, 475, 'Over the Counter', 'KATIK47-U30G-KATI-OINT', 'active'),
(5509, NULL, 'Katinko Inhaler', 'Katinko Inhaler (Unit: 1pcs)', 30, 255, '27.00', 16, 475, 'Over the Counter', 'KATIKI27-U1PCS-KATI-OINT', 'active'),
(5510, NULL, 'Katinko Oil', 'Katinko Oil (Unit: 35ml)', 30, 314, '31.00', 16, 475, 'Over the Counter', 'KATIKO31-U35ML-KATI-OINT', 'active'),
(5511, NULL, 'Katinko Oil', 'Katinko Oil (Unit: 10ml)', 30, 315, '31.00', 16, 475, 'Over the Counter', 'KATIKO31-U10ML-KATI-OINT', 'active'),
(5512, NULL, 'Mupirocin', 'Mupirocin (Unit: 1pcs)', 30, 255, '19.00', 16, 480, 'Over the Counter', 'MUPIM19-U1PCS-MUPI-OINT', 'active'),
(5513, NULL, 'Oil of wintergreen', 'Oil of wintergreen (Unit: 25ml)', 30, 275, '42.00', 16, 481, 'Over the Counter', 'OILOOOW42-U25ML-OIL-OINT', 'active'),
(5514, NULL, 'Oil of wintergreen', 'Oil of wintergreen (Unit: 50ml)', 30, 276, '25.00', 16, 481, 'Over the Counter', 'OILOOOW25-U50ML-OIL-OINT', 'active'),
(5515, NULL, 'Omega', 'Omega (Unit: 15ml)', 30, 36, '35.00', 16, 484, 'Over the Counter', 'OMEGO35-U15ML-OMEG-OINT', 'active'),
(5516, NULL, 'Omega', 'Omega (Unit: 30ml)', 30, 323, '37.00', 16, 484, 'Over the Counter', 'OMEGO37-U30ML-OMEG-OINT', 'active'),
(5517, NULL, 'Omega', 'Omega (Unit: 60ml)', 30, 117, '41.00', 16, 484, 'Over the Counter', 'OMEGO41-U60ML-OMEG-OINT', 'active'),
(5518, NULL, 'Omega', 'Omega (Unit: 120ml)', 30, 84, '35.00', 16, 484, 'Over the Counter', 'OMEGO35-U120ML-OMEG-OINT', 'active'),
(5519, NULL, 'Petroleum Jelly (Apollo)', 'Petroleum Jelly (Apollo) (Unit: 25g)', 30, 324, '38.00', 16, 487, 'Over the Counter', 'PETRPJA38-U25G-PETR-OINT', 'active'),
(5520, NULL, 'Petroleum Jelly (Vaseline)', 'Petroleum Jelly (Vaseline) (Unit: 25g)', 30, 324, '45.00', 16, 487, 'Over the Counter', 'PETRPJV45-U25G-PETR-OINT', 'active'),
(5521, NULL, 'Petroleum Jelly (Vaseline)', 'Petroleum Jelly (Vaseline) (Unit: 50g)', 30, 325, '30.00', 16, 487, 'Over the Counter', 'PETRPJV30-U50G-PETR-OINT', 'active'),
(5522, NULL, 'Salicylic Acid', 'Salicylic Acid (Unit: 25ml)', 30, 275, '43.00', 16, 491, 'Over the Counter', 'SALISA43-U25ML-SALI-OINT', 'active'),
(5523, NULL, 'Salicylic Acid', 'Salicylic Acid (Unit: 50ml)', 30, 276, '33.00', 16, 491, 'Over the Counter', 'SALISA33-U50ML-SALI-OINT', 'active'),
(5524, NULL, 'Salicylic Acid (Rhea)', 'Salicylic Acid (Rhea) (Unit: 15ml)', 30, 36, '40.00', 16, 491, 'Over the Counter', 'SALISAR40-U15ML-SALI-OINT', 'active'),
(5525, NULL, 'Salonpas', 'Salonpas (Unit: 1pcs)', 30, 255, '27.00', 16, 493, 'Over the Counter', 'SALOS27-U1PCS-SALO-OINT', 'active'),
(5526, NULL, 'Silver Sulfadiazine', 'Silver Sulfadiazine (Unit: 1pcs)', 30, 255, '9.00', 16, 494, 'Over the Counter', 'SILVSS9-U1PCS-SILV-OINT', 'active'),
(5527, NULL, 'Stepsils Menthol 8\'s', 'Stepsils Menthol 8\'s (Unit: 8pcs)', 30, 331, '27.00', 16, 495, 'Over the Counter', 'STEPSM8S27-U8PCS-STEP-OINT', 'active'),
(5528, NULL, 'Strepsils Honey Lemon 2\'s', 'Strepsils Honey Lemon 2\'s (Unit: 2pcs)', 30, 332, '25.00', 16, 496, 'Over the Counter', 'STRESHL2S25-U2PCS-STRE-OINT', 'active'),
(5529, NULL, 'Strepsils Honey Lemon 8\'s', 'Strepsils Honey Lemon 8\'s (Unit: 8pcs)', 30, 331, '41.00', 16, 496, 'Over the Counter', 'STRESHL8S41-U8PCS-STRE-OINT', 'active'),
(5530, NULL, 'Strepsils Menthol 2\'s', 'Strepsils Menthol 2\'s (Unit: 2pcs)', 30, 332, '31.00', 16, 496, 'Over the Counter', 'STRESM2S31-U2PCS-STRE-OINT', 'active'),
(5531, NULL, 'Strepsils Orange 2\'s', 'Strepsils Orange 2\'s (Unit: 2pcs)', 30, 332, '41.00', 16, 496, 'Over the Counter', 'STRESO2S41-U2PCS-STRE-OINT', 'active'),
(5532, NULL, 'Strepsils Orange 8\'s', 'Strepsils Orange 8\'s (Unit: 8pcs)', 30, 331, '36.00', 16, 496, 'Over the Counter', 'STRESO8S36-U8PCS-STRE-OINT', 'active'),
(5533, NULL, 'Sulfur Ointment', 'Sulfur Ointment (Unit: 1pcs)', 30, 255, '20.00', 16, 501, 'Over the Counter', 'SULFSO20-U1PCS-SULF-OINT', 'active'),
(5534, NULL, 'Superscent', 'Superscent (Unit: 25ml)', 30, 275, '36.00', 16, 502, 'Over the Counter', 'SUPES36-U25ML-SUPE-OINT', 'active'),
(5535, NULL, 'Superscent', 'Superscent (Unit: 50ml)', 30, 276, '34.00', 16, 502, 'Over the Counter', 'SUPES34-U50ML-SUPE-OINT', 'active'),
(5536, NULL, 'Tobramycin', 'Tobramycin (Unit: 1pcs)', 30, 255, '29.00', 16, 504, 'Over the Counter', 'TOBRT29-U1PCS-TOBR-OINT', 'active'),
(5537, NULL, 'Tobramycin + Dexamethasone', 'Tobramycin + Dexamethasone (Unit: 1pcs)', 30, 255, '32.00', 16, 504, 'Over the Counter', 'TOBRTD32-U1PCS-TOBR-OINT', 'active'),
(5538, NULL, 'Toothache Drops', 'Toothache Drops (Unit: 1pcs)', 30, 255, '24.00', 16, 505, 'Over the Counter', 'TOOTTD24-U1PCS-TOOT-OINT', 'active'),
(5539, NULL, 'Toothache Drops (Rhea)', 'Toothache Drops (Rhea) (Unit: 1pcs)', 30, 255, '40.00', 16, 505, 'Over the Counter', 'TOOTTDR40-U1PCS-TOOT-OINT', 'active'),
(5540, NULL, 'Vicks', 'Vicks (Unit: 5g)', 30, 283, '14.00', 16, 507, 'Over the Counter', 'VICKV14-U5G-VICK-OINT', 'active'),
(5541, NULL, 'Vicks', 'Vicks (Unit: 10g)', 30, 59, '33.00', 16, 507, 'Over the Counter', 'VICKV33-U10G-VICK-OINT', 'active'),
(5542, NULL, 'Vicks', 'Vicks (Unit: 25g)', 30, 324, '44.00', 16, 507, 'Over the Counter', 'VICKV44-U25G-VICK-OINT', 'active'),
(5543, NULL, 'Vicks', 'Vicks (Unit: 50g)', 30, 325, '30.00', 16, 507, 'Over the Counter', 'VICKV30-U50G-VICK-OINT', 'active'),
(5544, NULL, 'Vicks baby rub', 'Vicks baby rub (Unit: 8g)', 30, 350, '43.00', 16, 507, 'Over the Counter', 'VICKVBR43-U8G-VICK-OINT', 'active'),
(5545, NULL, 'Vicks baby rub', 'Vicks baby rub (Unit: 20g)', 30, 349, '18.00', 16, 507, 'Over the Counter', 'VICKVBR18-U20G-VICK-OINT', 'active'),
(5546, NULL, 'Vicks baby rub', 'Vicks baby rub (Unit: 45g)', 30, 347, '20.00', 16, 507, 'Over the Counter', 'VICKVBR20-U45G-VICK-OINT', 'active'),
(5547, NULL, 'Vicks Candy (Butter menthol)', 'Vicks Candy (Butter menthol) (Unit: 1pcs)', 30, 255, '16.00', 16, 507, 'Over the Counter', 'VICKVCBM16-U1PCS-VICK-OINT', 'active'),
(5548, NULL, 'Vicks Candy (Menthol)', 'Vicks Candy (Menthol) (Unit: 1pcs)', 30, 255, '12.00', 16, 507, 'Over the Counter', 'VICKVCM12-U1PCS-VICK-OINT', 'active'),
(5549, NULL, 'Vicks Candy (peppermint)', 'Vicks Candy (peppermint) (Unit: 1pcs)', 30, 255, '47.00', 16, 507, 'Over the Counter', 'VICKVCP47-U1PCS-VICK-OINT', 'active'),
(5550, NULL, 'Vicks Inhaler', 'Vicks Inhaler (Unit: 1pcs)', 30, 255, '100.00', 16, 507, 'Over the Counter', 'VICKVI100-U1PCS-VICK-OINT', 'active'),
(5551, NULL, 'Xylogel', 'Xylogel (Unit: 1pcs)', 30, 255, '59.00', 16, 519, 'Over the Counter', 'XYLOX59-U1PCS-XYLO-OINT', 'active'),
(5552, NULL, 'Anlene Milk', 'Anlene Milk (Unit: 300g)', 30, 356, '157.00', 1290, 520, 'Over the Counter', 'ANLEAM157-U300G-ANLE-FOOD', 'active'),
(5553, NULL, 'Anlene Milk', 'Anlene Milk (Unit: 600g)', 30, 357, '306.00', 1290, 520, 'Over the Counter', 'ANLEAM306-U600G-ANLE-FOOD', 'active'),
(5554, NULL, 'Anlene Milk', 'Anlene Milk (Unit: 180g)', 30, 358, '100.00', 1290, 520, 'Over the Counter', 'ANLEAM100-U180G-ANLE-FOOD', 'active'),
(5555, NULL, 'Anmum Milk', 'Anmum Milk (Unit: 375g)', 30, 359, '22.00', 1290, 527, 'Over the Counter', 'ANMUAM22-U375G-ANMU-FOOD', 'active'),
(5556, NULL, 'Bearbrand', 'Bearbrand (Unit: 700g)', 30, 360, '251.00', 1290, 523, 'Over the Counter', 'BEARB251-U700G-BEAR-FOOD', 'active'),
(5557, NULL, 'Bearbrand ', 'Bearbrand  (Unit: 320g)', 30, 364, '115.00', 1290, 523, 'Over the Counter', 'BEARB115-U320G-BEAR-FOOD', 'active'),
(5558, NULL, 'Bearbrand Jr.', 'Bearbrand Jr. (Unit: 180g)', 30, 358, '6.00', 1290, 523, 'Over the Counter', 'BEARBJ6-U180G-BEAR-FOOD', 'active'),
(5559, NULL, 'Bearbrand Jr.', 'Bearbrand Jr. (Unit: 420g)', 30, 366, '20.00', 1290, 523, 'Over the Counter', 'BEARBJ20-U420G-BEAR-FOOD', 'active'),
(5560, NULL, 'Bonakid 1-3', 'Bonakid 1-3 (Unit: 150g)', 30, 361, '47.00', 1290, 526, 'Over the Counter', 'BONAB1347-U150G-BONA-FOOD', 'active'),
(5561, NULL, 'Bonakid 1-3', 'Bonakid 1-3 (Unit: 350g)', 30, 362, '7.00', 1290, 526, 'Over the Counter', 'BONAB137-U350G-BONA-FOOD', 'active'),
(5562, NULL, 'Bonakid 3+', 'Bonakid 3+ (Unit: 350g)', 30, 362, '35.00', 1290, 526, 'Over the Counter', 'BONAB335-U350G-BONA-FOOD', 'active'),
(5563, NULL, 'Bonamil', 'Bonamil (Unit: 150g)', 30, 361, '84.00', 1290, 531, 'Over the Counter', 'BONAB84-U150G-BONA-FOOD', 'active'),
(5564, NULL, 'Bonamil', 'Bonamil (Unit: 350g)', 30, 362, '42.00', 1290, 531, 'Over the Counter', 'BONAB42-U350G-BONA-FOOD', 'active'),
(5565, NULL, 'Bonna', 'Bonna (Unit: 150g)', 30, 361, '26.00', 1290, 537, 'Over the Counter', 'BONNB26-U150G-BONN-FOOD', 'active'),
(5566, NULL, 'Bonna', 'Bonna (Unit: 350g)', 30, 362, '23.00', 1290, 537, 'Over the Counter', 'BONNB23-U350G-BONN-FOOD', 'active'),
(5567, NULL, 'Care Adult large 8\'s', 'Care Adult large 8\'s (Size: Large)', 13, 28, '28.00', 17, 536, 'Over the Counter', 'CARECAL8S28-SLRG-CARE-BABY', 'active'),
(5568, NULL, 'Care Adult M 10\'s', 'Care Adult M 10\'s (Size: Medium)', 13, 27, '34.00', 17, 536, 'Over the Counter', 'CARECAM1S34-SMDM-CARE-BABY', 'active'),
(5569, NULL, 'Caress underpad L 2\'s', 'Caress underpad L 2\'s (Size: Large)', 13, 28, '44.00', 17, 538, 'Over the Counter', 'CARECUL2S44-SLRG-CARE-BABY', 'active'),
(5570, NULL, 'Caress underpad M 1\'s', 'Caress underpad M 1\'s (Size: Medium)', 13, 27, '23.00', 17, 538, 'Over the Counter', 'CARECUM1S23-SMDM-CARE-BABY', 'active'),
(5571, NULL, 'Cerelac', 'Cerelac (Unit: 120g)', 30, 373, '65.00', 17, 534, 'Over the Counter', 'CEREC65-U120G-CERE-BABY', 'active'),
(5572, NULL, 'EQ dry L 16\'s', 'EQ dry L 16\'s (Size: Large)', 13, 28, '35.00', 17, 123, 'Over the Counter', 'EQDREDL1S35-SLRG-EQ-BABY', 'active'),
(5573, NULL, 'EQ dry L 4\'s', 'EQ dry L 4\'s (Size: Large)', 13, 28, '22.00', 17, 123, 'Over the Counter', 'EQDREDL4S22-SLRG-EQ-BABY', 'active'),
(5574, NULL, 'EQ dry M 18\'s', 'EQ dry M 18\'s (Size: Medium)', 13, 27, '12.00', 17, 123, 'Over the Counter', 'EQDREDM1S12-SMDM-EQ-BABY', 'active'),
(5575, NULL, 'EQ dry M 4\'s', 'EQ dry M 4\'s (Size: Medium)', 13, 27, '26.00', 17, 123, 'Over the Counter', 'EQDREDM4S26-SMDM-EQ-BABY', 'active'),
(5576, NULL, 'EQ dry NB 22\'s', 'EQ dry NB 22\'s (Size: Newborn)', 13, 41, '5.00', 17, 123, 'Over the Counter', 'EQDREDN2S5-SNWBRN-EQ-BABY', 'active'),
(5577, NULL, 'EQ dry NB 4\'S', 'EQ dry NB 4\'S (Size: Newborn)', 13, 41, '13.00', 17, 123, 'Over the Counter', 'EQDREDN4S13-SNWBRN-EQ-BABY', 'active'),
(5578, NULL, 'EQ dry S 20\'s', 'EQ dry S 20\'s (Size: Small)', 13, 21, '15.00', 17, 123, 'Over the Counter', 'EQDREDS2S15-SSMLL-EQ-BABY', 'active'),
(5579, NULL, 'EQ dry S 4\'s', 'EQ dry S 4\'s (Size: Small)', 13, 21, '42.00', 17, 123, 'Over the Counter', 'EQDREDS4S42-SSMLL-EQ-BABY', 'active'),
(5580, NULL, 'EQ dry XL 14\'s', 'EQ dry XL 14\'s (Size: Extra Large)', 13, 47, '46.00', 17, 123, 'Over the Counter', 'EQDREDX1S46-SXTRLRG-EQ-BABY', 'active'),
(5581, NULL, 'EQ dry XL 4\'s', 'EQ dry XL 4\'s (Size: Extra Large)', 13, 47, '28.00', 17, 123, 'Over the Counter', 'EQDREDX4S28-SXTRLRG-EQ-BABY', 'active'),
(5582, NULL, 'EQ pants 4\'s L', 'EQ pants 4\'s L (Size: Large)', 13, 28, '37.00', 17, 123, 'Over the Counter', 'EQPAEP4SL37-SLRG-EQ-BABY', 'active'),
(5583, NULL, 'EQ pants L 10\'s', 'EQ pants L 10\'s (Size: Large)', 13, 28, '28.00', 17, 123, 'Over the Counter', 'EQPAEPL1S28-SLRG-EQ-BABY', 'active'),
(5584, NULL, 'EQ pants M 10\'s', 'EQ pants M 10\'s (Size: Medium)', 13, 27, '35.00', 17, 123, 'Over the Counter', 'EQPAEPM1S35-SMDM-EQ-BABY', 'active'),
(5585, NULL, 'EQ pants XL 10\'s', 'EQ pants XL 10\'s (Size: Extra Large)', 13, 47, '14.00', 17, 123, 'Over the Counter', 'EQPAEPX1S14-SXTRLRG-EQ-BABY', 'active'),
(5586, NULL, 'Happy Large 12\'s', 'Happy Large 12\'s (Size: Large)', 13, 28, '15.00', 17, 555, 'Over the Counter', 'HAPPHL1S15-SLRG-HAPP-BABY', 'active'),
(5587, NULL, 'Happy Large 4\'s', 'Happy Large 4\'s (Size: Large)', 13, 28, '5.00', 17, 555, 'Over the Counter', 'HAPPHL4S5-SLRG-HAPP-BABY', 'active'),
(5588, NULL, 'Happy Medium 4\'s', 'Happy Medium 4\'s (Size: Medium)', 13, 27, '32.00', 17, 555, 'Over the Counter', 'HAPPHM4S32-SMDM-HAPP-BABY', 'active'),
(5589, NULL, 'Happy pants Large 12\'s', 'Happy pants Large 12\'s (Size: Large)', 13, 28, '37.00', 17, 555, 'Over the Counter', 'HAPPHPL1S37-SLRG-HAPP-BABY', 'active'),
(5590, NULL, 'Happy pants Large 24\'s', 'Happy pants Large 24\'s (Size: Large)', 13, 28, '34.00', 17, 555, 'Over the Counter', 'HAPPHPL2S34-SLRG-HAPP-BABY', 'active'),
(5591, NULL, 'Happy pants Large 4\'s', 'Happy pants Large 4\'s (Size: Large)', 13, 28, '26.00', 17, 555, 'Over the Counter', 'HAPPHPL4S26-SLRG-HAPP-BABY', 'active'),
(5592, NULL, 'Happy pants Medium 12\'s', 'Happy pants Medium 12\'s (Size: Medium)', 13, 27, '43.00', 17, 555, 'Over the Counter', 'HAPPHPM1S43-SMDM-HAPP-BABY', 'active'),
(5593, NULL, 'Happy pants Medium 24\'s', 'Happy pants Medium 24\'s (Size: Medium)', 13, 27, '26.00', 17, 555, 'Over the Counter', 'HAPPHPM2S26-SMDM-HAPP-BABY', 'active'),
(5594, NULL, 'Happy pants Medium 4\'s', 'Happy pants Medium 4\'s (Size: Medium)', 13, 27, '15.00', 17, 555, 'Over the Counter', 'HAPPHPM4S15-SMDM-HAPP-BABY', 'active'),
(5595, NULL, 'Happy pants XL 12\'s', 'Happy pants XL 12\'s (Size: Extra Large)', 13, 47, '25.00', 17, 555, 'Over the Counter', 'HAPPHPX1S25-SXTRLRG-HAPP-BABY', 'active'),
(5596, NULL, 'Happy pants XL 24\'s', 'Happy pants XL 24\'s (Size: Extra Large)', 13, 47, '32.00', 17, 555, 'Over the Counter', 'HAPPHPX2S32-SXTRLRG-HAPP-BABY', 'active'),
(5597, NULL, 'Happy pants XL 4\'s', 'Happy pants XL 4\'s (Size: Extra Large)', 13, 47, '24.00', 17, 555, 'Over the Counter', 'HAPPHPX4S24-SXTRLRG-HAPP-BABY', 'active'),
(5598, NULL, 'Happy pants XXL 12\'s', 'Happy pants XXL 12\'s (Size: XX Large)', 13, 401, '28.00', 17, 555, 'Over the Counter', 'HAPPHPX1S28-SXXLRG-HAPP-BABY', 'active'),
(5599, NULL, 'Happy pants XXL 24\'s', 'Happy pants XXL 24\'s (Size: XX Large)', 13, 401, '36.00', 17, 555, 'Over the Counter', 'HAPPHPX2S36-SXXLRG-HAPP-BABY', 'active'),
(5600, NULL, 'Happy pants XXL 4\'s', 'Happy pants XXL 4\'s (Size: XX Large)', 13, 401, '8.00', 17, 555, 'Over the Counter', 'HAPPHPX4S8-SXXLRG-HAPP-BABY', 'active'),
(5601, NULL, 'Happy pants XXXL 24\'s', 'Happy pants XXXL 24\'s (Size: XXX Large)', 13, 405, '37.00', 17, 555, 'Over the Counter', 'HAPPHPX2S37-SXXXLRG-HAPP-BABY', 'active'),
(5602, NULL, 'Happy pants XXXL 4\'s', 'Happy pants XXXL 4\'s (Size: XXX Large)', 13, 405, '12.00', 17, 555, 'Over the Counter', 'HAPPHPX4S12-SXXXLRG-HAPP-BABY', 'active'),
(5603, NULL, 'Happy Small 4\'s', 'Happy Small 4\'s (Size: Small)', 13, 21, '39.00', 17, 555, 'Over the Counter', 'HAPPHS4S39-SSMLL-HAPP-BABY', 'active'),
(5604, NULL, 'Happy XL 4\'s', 'Happy XL 4\'s (Size: Extra Large)', 13, 47, '29.00', 17, 555, 'Over the Counter', 'HAPPHX4S29-SXTRLRG-HAPP-BABY', 'active');
INSERT INTO `tblproducts` (`productID`, `productImage`, `productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, `productCategory`, `productBrand`, `productAvailability`, `productSKU`, `productStatus`) VALUES
(5605, NULL, 'Lactum 0-6', 'Lactum 0-6 (Unit: 150g)', 30, 361, '29.00', 17, 573, 'Over the Counter', 'LACTL0629-U150G-LACT-BABY', 'active'),
(5606, NULL, 'Lactum 0-6', 'Lactum 0-6 (Unit: 350g)', 30, 362, '14.00', 17, 573, 'Over the Counter', 'LACTL0614-U350G-LACT-BABY', 'active'),
(5607, NULL, 'Lactum 1-3', 'Lactum 1-3 (Unit: 150g)', 30, 361, '38.00', 17, 573, 'Over the Counter', 'LACTL1338-U150G-LACT-BABY', 'active'),
(5608, NULL, 'Lactum 1-3', 'Lactum 1-3 (Unit: 350g)', 30, 362, '42.00', 17, 573, 'Over the Counter', 'LACTL1342-U350G-LACT-BABY', 'active'),
(5609, NULL, 'Lactum 6-12', 'Lactum 6-12 (Unit: 150g)', 30, 361, '40.00', 17, 573, 'Over the Counter', 'LACTL6140-U150G-LACT-BABY', 'active'),
(5610, NULL, 'Lactum 6-12', 'Lactum 6-12 (Unit: 350g)', 30, 362, '30.00', 17, 573, 'Over the Counter', 'LACTL6130-U350G-LACT-BABY', 'active'),
(5611, NULL, 'Nestogen 1', 'Nestogen 1 (Unit: 135g)', 30, 417, '14.00', 17, 577, 'Over the Counter', 'NESTN114-U135G-NEST-BABY', 'active'),
(5612, NULL, 'Nestogen 1', 'Nestogen 1 (Unit: 340g)', 30, 416, '18.00', 17, 577, 'Over the Counter', 'NESTN118-U340G-NEST-BABY', 'active'),
(5613, NULL, 'Nestogen 2', 'Nestogen 2 (Unit: 135g)', 30, 417, '33.00', 17, 577, 'Over the Counter', 'NESTN233-U135G-NEST-BABY', 'active'),
(5614, NULL, 'Nestogen 2', 'Nestogen 2 (Unit: 340g)', 30, 416, '38.00', 17, 577, 'Over the Counter', 'NESTN238-U340G-NEST-BABY', 'active'),
(5615, NULL, 'Nestogen 3', 'Nestogen 3 (Unit: 135g)', 30, 417, '29.00', 17, 577, 'Over the Counter', 'NESTN329-U135G-NEST-BABY', 'active'),
(5616, NULL, 'Nestogen 3', 'Nestogen 3 (Unit: 340g)', 30, 416, '44.00', 17, 577, 'Over the Counter', 'NESTN344-U340G-NEST-BABY', 'active'),
(5617, NULL, 'Nestogen Classic', 'Nestogen Classic (Unit: 135g)', 30, 417, '36.00', 17, 577, 'Over the Counter', 'NESTNC36-U135G-NEST-BABY', 'active'),
(5618, NULL, 'Nido 1-3', 'Nido 1-3 (Unit: 180g)', 30, 358, '11.00', 17, 586, 'Over the Counter', 'NIDON1311-U180G-NIDO-BABY', 'active'),
(5619, NULL, 'Nido 1-3', 'Nido 1-3 (Unit: 400g)', 30, 423, '211.00', 17, 586, 'Over the Counter', 'NIDON13211-U400G-NIDO-BABY', 'active'),
(5620, NULL, 'Nido 1-3', 'Nido 1-3 (Unit: 1.6kg)', 30, 424, '48.00', 17, 586, 'Over the Counter', 'NIDON1348-U16KG-NIDO-BABY', 'active'),
(5621, NULL, 'Nido 3+', 'Nido 3+ (Unit: 400g)', 30, 423, '212.00', 17, 586, 'Over the Counter', 'NIDON3212-U400G-NIDO-BABY', 'active'),
(5622, NULL, 'Nido 5+', 'Nido 5+ (Unit: 400g)', 30, 423, '209.00', 17, 586, 'Over the Counter', 'NIDON5209-U400G-NIDO-BABY', 'active'),
(5623, NULL, 'Pampers L 4\'s', 'Pampers L 4\'s (Size: Large)', 13, 28, '29.00', 17, 591, 'Over the Counter', 'PAMPPL4S29-SLRG-PAMP-BABY', 'active'),
(5624, NULL, 'Pampers Large 14\'s', 'Pampers Large 14\'s (Size: Large)', 13, 28, '40.00', 17, 591, 'Over the Counter', 'PAMPPL1S40-SLRG-PAMP-BABY', 'active'),
(5625, NULL, 'Pampers L-XL overnight 30\'s', 'Pampers L-XL overnight 30\'s (Size: Large-Extra Large)', 13, 428, '47.00', 17, 591, 'Over the Counter', 'PAMPPLXO3S47-SLRGXTRLRG-PAMP-BABY', 'active'),
(5626, NULL, 'Pampers M 4\'s', 'Pampers M 4\'s (Size: Medium)', 13, 27, '14.00', 17, 591, 'Over the Counter', 'PAMPPM4S14-SMDM-PAMP-BABY', 'active'),
(5627, NULL, 'Pampers NB 20\'s', 'Pampers NB 20\'s (Size: Newborn)', 13, 41, '17.00', 17, 591, 'Over the Counter', 'PAMPPN2S17-SNWBRN-PAMP-BABY', 'active'),
(5628, NULL, 'Pampers NB 40\'s', 'Pampers NB 40\'s (Size: Newborn)', 13, 41, '34.00', 17, 591, 'Over the Counter', 'PAMPPN4S34-SNWBRN-PAMP-BABY', 'active'),
(5629, NULL, 'Pampers NB 4\'s', 'Pampers NB 4\'s (Size: Newborn)', 13, 41, '36.00', 17, 591, 'Over the Counter', 'PAMPPN4S36-SNWBRN-PAMP-BABY', 'active'),
(5630, NULL, 'Pampers pants L 4\'s', 'Pampers pants L 4\'s (Size: Large)', 13, 28, '10.00', 17, 591, 'Over the Counter', 'PAMPPPL4S10-SLRG-PAMP-BABY', 'active'),
(5631, NULL, 'Pampers pants M 4\'s', 'Pampers pants M 4\'s (Size: Medium)', 13, 27, '9.00', 17, 591, 'Over the Counter', 'PAMPPPM4S9-SMDM-PAMP-BABY', 'active'),
(5632, NULL, 'Pampers pants XL 4\'s', 'Pampers pants XL 4\'s (Size: Extra Large)', 13, 47, '39.00', 17, 591, 'Over the Counter', 'PAMPPPX4S39-SXTRLRG-PAMP-BABY', 'active'),
(5633, NULL, 'Pampers S 4\'s', 'Pampers S 4\'s (Size: Small)', 13, 21, '7.00', 17, 591, 'Over the Counter', 'PAMPPS4S7-SSMLL-PAMP-BABY', 'active'),
(5634, NULL, 'Pampers Small 38\'s', 'Pampers Small 38\'s (Size: Small)', 13, 21, '36.00', 17, 591, 'Over the Counter', 'PAMPPS3S36-SSMLL-PAMP-BABY', 'active'),
(5635, NULL, 'Pampers XL 4\'s', 'Pampers XL 4\'s (Size: Extra Large)', 13, 47, '47.00', 17, 591, 'Over the Counter', 'PAMPPX4S47-SXTRLRG-PAMP-BABY', 'active'),
(5636, NULL, 'Pampers XL 7\'s', 'Pampers XL 7\'s (Size: Extra Large)', 13, 47, '11.00', 17, 591, 'Over the Counter', 'PAMPPX7S11-SXTRLRG-PAMP-BABY', 'active'),
(5637, NULL, 'Pediasure 1-3', 'Pediasure 1-3 (Unit: 400g)', 30, 423, '43.00', 17, 609, 'Over the Counter', 'PEDIP1343-U400G-PEDI-BABY', 'active'),
(5638, NULL, 'Althea Pills', 'Althea Pills (Unit: 1pcs)', 30, 255, '485.00', 14, 603, 'Over the Counter', 'ALTHAP485-U1PCS-ALTH-CONT', 'active'),
(5639, NULL, 'Daphne Pills', 'Daphne Pills (Unit: 1pcs)', 30, 255, '142.00', 14, 604, 'Over the Counter', 'DAPHDP142-U1PCS-DAPH-CONT', 'active'),
(5640, NULL, 'Diane Pills', 'Diane Pills (Unit: 1pcs)', 30, 255, '686.00', 14, 605, 'Over the Counter', 'DIANDP686-U1PCS-DIAN-CONT', 'active'),
(5641, NULL, 'Ez Jelly', 'Ez Jelly (Unit: 1pcs)', 30, 255, '20.00', 14, 606, 'Over the Counter', 'EZJEEJ20-U1PCS-EZ-CONT', 'active'),
(5642, NULL, 'Lady Pills', 'Lady Pills (Unit: 1pcs)', 30, 255, '50.00', 14, 610, 'Over the Counter', 'LADYLP50-U1PCS-LADY-CONT', 'active'),
(5643, NULL, 'Marvelon Pills', 'Marvelon Pills (Unit: 1pcs)', 30, 255, '127.00', 14, 611, 'Over the Counter', 'MARVMP127-U1PCS-MARV-CONT', 'active'),
(5644, NULL, 'Micropill', 'Micropill (Unit: 1pcs)', 30, 255, '65.00', 14, 612, 'Over the Counter', 'MICRM65-U1PCS-MICR-CONT', 'active'),
(5645, NULL, 'Robust 2\'s', 'Robust 2\'s (Unit: 2pcs)', 30, 332, '127.00', 14, 613, 'Over the Counter', 'ROBUR2S127-U2PCS-ROBU-CONT', 'active'),
(5646, NULL, 'Robust Extreme 2\'s', 'Robust Extreme 2\'s (Unit: 2pcs)', 30, 332, '268.00', 14, 613, 'Over the Counter', 'ROBURE2S268-U2PCS-ROBU-CONT', 'active'),
(5647, NULL, 'Trust Chocolate', 'Trust Chocolate (Unit: 1pcs)', 30, 255, '22.00', 14, 614, 'Over the Counter', 'TRUSTC22-U1PCS-TRUS-CONT', 'active'),
(5648, NULL, 'Trust Natural', 'Trust Natural (Unit: 1pcs)', 30, 255, '22.00', 14, 614, 'Over the Counter', 'TRUSTN22-U1PCS-TRUS-CONT', 'active'),
(5649, NULL, 'Trust Pills', 'Trust Pills (Unit: 1pcs)', 30, 255, '52.00', 14, 614, 'Over the Counter', 'TRUSTP52-U1PCS-TRUS-CONT', 'active'),
(5650, NULL, 'Trust Strawberry', 'Trust Strawberry (Unit: 1pcs)', 30, 255, '24.00', 14, 614, 'Over the Counter', 'TRUSTS24-U1PCS-TRUS-CONT', 'active'),
(5651, NULL, 'Advil', 'Advil (Dosage: 200mg)', 15, 100, '4.00', 12, 620, 'Over the Counter', 'ADVIA4-D200MG-ADVI-BRAN', 'active'),
(5652, NULL, 'Alaxan FR', 'Alaxan FR (Dosage: 200mg/325mg)', 15, 449, '3.00', 12, 619, 'Over the Counter', 'ALAXAF3-D200MG325MG-ALAX-BRAN', 'active'),
(5653, NULL, 'Allerkid', 'Allerkid (Dosage: 60ml)', 15, 117, '3.00', 12, 621, 'Over the Counter', 'ALLEA3-D60ML-ALLE-BRAN', 'active'),
(5654, NULL, 'Allerkid', 'Allerkid (Dosage: 30ml)', 15, 323, '11.00', 12, 621, 'Over the Counter', 'ALLEA11-D30ML-ALLE-BRAN', 'active'),
(5655, NULL, 'Allerkid drops', 'Allerkid drops (Dosage: 30ml)', 15, 323, '5.00', 12, 621, 'Over the Counter', 'ALLEAD5-D30ML-ALLE-BRAN', 'active'),
(5656, NULL, 'Allerta', 'Allerta (Dosage: 10mg)', 15, 45, '20.00', 12, 629, 'Over the Counter', 'ALLEA20-D10MG-ALLE-BRAN', 'active'),
(5657, NULL, 'Alnix', 'Alnix (Dosage: 10mg)', 15, 45, '25.00', 12, 626, 'Over the Counter', 'ALNIA25-D10MG-ALNI-BRAN', 'active'),
(5658, NULL, 'Alnix', 'Alnix (Dosage: 30ml)', 15, 323, '8.00', 12, 626, 'Over the Counter', 'ALNIA8-D30ML-ALNI-BRAN', 'active'),
(5659, NULL, 'Alnix Plus', 'Alnix Plus (Dosage: 60ml)', 15, 117, '7.00', 12, 626, 'Over the Counter', 'ALNIAP7-D60ML-ALNI-BRAN', 'active'),
(5660, NULL, 'Amlife', 'Amlife (Dosage: 50mg/5mg)', 15, 464, '20.00', 12, 624, 'Over the Counter', 'AMLIA20-D50MG5MG-AMLI-BRAN', 'active'),
(5661, NULL, 'Arcoxia', 'Arcoxia (Dosage: 60mg)', 15, 159, '54.00', 12, 625, 'Over the Counter', 'ARCOA54-D60MG-ARCO-BRAN', 'active'),
(5662, NULL, 'Arcoxia', 'Arcoxia (Dosage: 90mg)', 15, 466, '60.00', 12, 625, 'Over the Counter', 'ARCOA60-D90MG-ARCO-BRAN', 'active'),
(5663, NULL, 'Arcoxia', 'Arcoxia (Dosage: 120mg)', 15, 154, '81.00', 12, 625, 'Over the Counter', 'ARCOA81-D120MG-ARCO-BRAN', 'active'),
(5664, NULL, 'Ascof adult', 'Ascof adult (Dosage: 60ml)', 15, 117, '83.00', 12, 632, 'Over the Counter', 'ASCOAA83-D60ML-ASCO-BRAN', 'active'),
(5665, NULL, 'Ascof adult', 'Ascof adult (Dosage: 120ml)', 15, 84, '88.00', 12, 632, 'Over the Counter', 'ASCOAA88-D120ML-ASCO-BRAN', 'active'),
(5666, NULL, 'Ascof cap', 'Ascof cap (Dosage: 600mg)', 15, 33, '3.00', 12, 632, 'Over the Counter', 'ASCOAC3-D600MG-ASCO-BRAN', 'active'),
(5667, NULL, 'Ascof kids', 'Ascof kids (Dosage: 60ml)', 15, 117, '84.00', 12, 632, 'Over the Counter', 'ASCOAK84-D60ML-ASCO-BRAN', 'active'),
(5668, NULL, 'Asmalin', 'Asmalin (Dosage: 60ml)', 15, 117, '95.00', 12, 636, 'Over the Counter', 'ASMAA95-D60ML-ASMA-BRAN', 'active'),
(5669, NULL, 'Aspilet', 'Aspilet (Dosage: 80mg)', 15, 88, '0.00', 12, 637, 'Over the Counter', 'ASPIA0-D80MG-ASPI-BRAN', 'active'),
(5670, NULL, 'Bactidol', 'Bactidol (Dosage: 60ml)', 15, 117, '107.00', 12, 640, 'Over the Counter', 'BACTB107-D60ML-BACT-BRAN', 'active'),
(5671, NULL, 'Bactidol', 'Bactidol (Dosage: 120ml)', 15, 84, '199.00', 12, 640, 'Over the Counter', 'BACTB199-D120ML-BACT-BRAN', 'active'),
(5672, NULL, 'Betadine Gargle', 'Betadine Gargle (Dosage: 60ml)', 15, 117, '101.00', 12, 639, 'Over the Counter', 'BETABG101-D60ML-BETA-BRAN', 'active'),
(5673, NULL, 'Bewell C', 'Bewell C (Dosage: 500mg)', 15, 78, '1.00', 12, 641, 'Over the Counter', 'BEWEBC1-D500MG-BEWE-BRAN', 'active'),
(5674, NULL, 'Bioflu', 'Bioflu (Dosage: 1pcs)', 15, 255, '4.00', 12, 642, 'Over the Counter', 'BIOFB4-D1PCS-BIOF-BRAN', 'active'),
(5675, NULL, 'Biogesic', 'Biogesic (Dosage: 500mg)', 15, 78, '1.00', 12, 648, 'Over the Counter', 'BIOGB1-D500MG-BIOG-BRAN', 'active'),
(5676, NULL, 'Biogesic', 'Biogesic (Dosage: 120mg/60ml)', 15, 483, '73.00', 12, 648, 'Over the Counter', 'BIOGB73-D120MG60ML-BIOG-BRAN', 'active'),
(5677, NULL, 'Biogesic', 'Biogesic (Dosage: 250mg/60ml)', 15, 81, '46.00', 12, 648, 'Over the Counter', 'BIOGB46-D250MG60ML-BIOG-BRAN', 'active'),
(5678, NULL, 'Biogesic drops', 'Biogesic drops (Dosage: 15ml)', 15, 36, '67.00', 12, 648, 'Over the Counter', 'BIOGBD67-D15ML-BIOG-BRAN', 'active'),
(5679, NULL, 'Buscopan', 'Buscopan (Dosage: 1pcs)', 15, 255, '23.00', 12, 647, 'Over the Counter', 'BUSCB23-D1PCS-BUSC-BRAN', 'active'),
(5680, NULL, 'Buscopan Plus', 'Buscopan Plus (Dosage: 1pcs)', 15, 255, '32.00', 12, 647, 'Over the Counter', 'BUSCBP32-D1PCS-BUSC-BRAN', 'active'),
(5681, NULL, 'Buscopan Venus', 'Buscopan Venus (Dosage: 1pcs)', 15, 255, '31.00', 12, 647, 'Over the Counter', 'BUSCBV31-D1PCS-BUSC-BRAN', 'active'),
(5682, NULL, 'Calpol', 'Calpol (Dosage: 250/60ml)', 15, 486, '55.00', 12, 645, 'Over the Counter', 'CALPC55-D25060ML-CALP-BRAN', 'active'),
(5683, NULL, 'Calpol ', 'Calpol  (Dosage: 120/60ml)', 15, 487, '51.00', 12, 645, 'Over the Counter', 'CALPC51-D12060ML-CALP-BRAN', 'active'),
(5684, NULL, 'Caltrate plus', 'Caltrate plus (Dosage: 1pcs)', 15, 255, '4.00', 12, 652, 'Over the Counter', 'CALTCP4-D1PCS-CALT-BRAN', 'active'),
(5685, NULL, 'Catapres', 'Catapres (Dosage: 75mcg)', 15, 127, '33.00', 12, 653, 'Over the Counter', 'CATAC33-D75MCG-CATA-BRAN', 'active'),
(5686, NULL, 'Ceelin', 'Ceelin (Dosage: 250ml)', 15, 497, '52.00', 12, 655, 'Over the Counter', 'CEELC52-D250ML-CEEL-BRAN', 'active'),
(5687, NULL, 'Ceelin', 'Ceelin (Dosage: 120ml)', 15, 84, '78.00', 12, 655, 'Over the Counter', 'CEELC78-D120ML-CEEL-BRAN', 'active'),
(5688, NULL, 'Ceelin', 'Ceelin (Dosage: 60ml)', 15, 117, '57.00', 12, 655, 'Over the Counter', 'CEELC57-D60ML-CEEL-BRAN', 'active'),
(5689, NULL, 'Ceelin chewables 30\'s', 'Ceelin chewables 30\'s (Dosage: 1pcs)', 15, 255, '144.00', 12, 655, 'Over the Counter', 'CEELCC3S144-D1PCS-CEEL-BRAN', 'active'),
(5690, NULL, 'Ceelin drops', 'Ceelin drops (Dosage: 15ml)', 15, 36, '28.00', 12, 655, 'Over the Counter', 'CEELCD28-D15ML-CEEL-BRAN', 'active'),
(5691, NULL, 'Ceelin drops', 'Ceelin drops (Dosage: 30ml)', 15, 323, '40.00', 12, 655, 'Over the Counter', 'CEELCD40-D30ML-CEEL-BRAN', 'active'),
(5692, NULL, 'Ceelin plus', 'Ceelin plus (Dosage: 1pcs)', 15, 255, '1.50', 12, 655, 'Over the Counter', 'CEELCP1.5-D1PCS-CEEL-BRAN', 'active'),
(5693, NULL, 'Ceelin Plus', 'Ceelin Plus (Dosage: 250ml)', 15, 497, '43.00', 12, 655, 'Over the Counter', 'CEELCP43-D250ML-CEEL-BRAN', 'active'),
(5694, NULL, 'Ceelin Plus', 'Ceelin Plus (Dosage: 120ml)', 15, 84, '28.00', 12, 655, 'Over the Counter', 'CEELCP28-D120ML-CEEL-BRAN', 'active'),
(5695, NULL, 'Ceelin Plus', 'Ceelin Plus (Dosage: 60ml)', 15, 117, '26.00', 12, 655, 'Over the Counter', 'CEELCP26-D60ML-CEEL-BRAN', 'active'),
(5696, NULL, 'Ceelin plus drops', 'Ceelin plus drops (Dosage: 15ml)', 15, 36, '25.00', 12, 655, 'Over the Counter', 'CEELCPD25-D15ML-CEEL-BRAN', 'active'),
(5697, NULL, 'Ceelin plus drops', 'Ceelin plus drops (Dosage: 30ml)', 15, 323, '24.00', 12, 655, 'Over the Counter', 'CEELCPD24-D30ML-CEEL-BRAN', 'active'),
(5698, NULL, 'Centrum Advance', 'Centrum Advance (Dosage: 1pcs)', 15, 255, '10.00', 12, 666, 'Over the Counter', 'CENTCA10-D1PCS-CENT-BRAN', 'active'),
(5699, NULL, 'Centrum Advance 30\'s', 'Centrum Advance 30\'s (Dosage: 30pcs)', 15, 501, '297.00', 12, 666, 'Over the Counter', 'CENTCA3S297-D30PCS-CENT-BRAN', 'active'),
(5700, NULL, 'Centrum Silver', 'Centrum Silver (Dosage: 1pcs)', 15, 255, '12.00', 12, 666, 'Over the Counter', 'CENTCS12-D1PCS-CENT-BRAN', 'active'),
(5701, NULL, 'Centrum SIlver 30\'s', 'Centrum SIlver 30\'s (Dosage: 30pcs)', 15, 501, '357.00', 12, 666, 'Over the Counter', 'CENTCS3S357-D30PCS-CENT-BRAN', 'active'),
(5702, NULL, 'Cherifer drops', 'Cherifer drops (Dosage: 15ml)', 15, 36, '10.00', 12, 668, 'Over the Counter', 'CHERCD10-D15ML-CHER-BRAN', 'active'),
(5703, NULL, 'Cherifer PGM + Zinc', 'Cherifer PGM + Zinc (Dosage: 1pcs)', 15, 255, '17.00', 12, 668, 'Over the Counter', 'CHERCPZ17-D1PCS-CHER-BRAN', 'active'),
(5704, NULL, 'Cherifer with zinc', 'Cherifer with zinc (Dosage: 120ml)', 15, 84, '117.00', 12, 668, 'Over the Counter', 'CHERCWZ117-D120ML-CHER-BRAN', 'active'),
(5705, NULL, 'Claritin', 'Claritin (Dosage: 10mg)', 15, 45, '29.00', 12, 675, 'Over the Counter', 'CLARC29-D10MG-CLAR-BRAN', 'active'),
(5706, NULL, 'Co-aleva', 'Co-aleva (Dosage: 10mg/500mcg)', 15, 510, '118.00', 12, 669, 'Over the Counter', 'COALCA118-D10MG500MCG-CO-A-BRAN', 'active'),
(5707, NULL, 'Co-altria', 'Co-altria (Dosage: 10mg/5mg)', 15, 511, '24.00', 12, 672, 'Over the Counter', 'COALCA24-D10MG5MG-CO-A-BRAN', 'active'),
(5708, NULL, 'Conzace', 'Conzace (Dosage: 1pcs)', 15, 255, '7.00', 12, 674, 'Over the Counter', 'CONZC7-D1PCS-CONZ-BRAN', 'active'),
(5709, NULL, 'Decilone forte', 'Decilone forte (Dosage: 4mg)', 15, 161, '25.00', 12, 677, 'Over the Counter', 'DECIDF25-D4MG-DECI-BRAN', 'active'),
(5710, NULL, 'Decolgen', 'Decolgen (Dosage: 1pcs)', 15, 255, '3.00', 12, 678, 'Over the Counter', 'DECOD3-D1PCS-DECO-BRAN', 'active'),
(5711, NULL, 'Decolgen non drowse', 'Decolgen non drowse (Dosage: 1pcs)', 15, 255, '2.00', 12, 678, 'Over the Counter', 'DECODND2-D1PCS-DECO-BRAN', 'active'),
(5712, NULL, 'Decolsin', 'Decolsin (Dosage: 15mg)', 15, 194, '1.00', 12, 682, 'Over the Counter', 'DECOD1-D15MG-DECO-BRAN', 'active'),
(5713, NULL, 'Decolsin', 'Decolsin (Dosage: 25mg)', 15, 104, '3.00', 12, 682, 'Over the Counter', 'DECOD3-D25MG-DECO-BRAN', 'active'),
(5714, NULL, 'Decolsin', 'Decolsin (Dosage: 325mg)', 15, 149, '7.00', 12, 682, 'Over the Counter', 'DECOD7-D325MG-DECO-BRAN', 'active'),
(5715, NULL, 'Diatabs', 'Diatabs (Dosage: 1pcs)', 15, 255, '6.00', 12, 685, 'Over the Counter', 'DIATD6-D1PCS-DIAT-BRAN', 'active'),
(5716, NULL, 'Difflam Spray', 'Difflam Spray (Dosage: 15ml)', 15, 36, '524.00', 12, 457, 'Over the Counter', 'DIFFDS524-D15ML-DIFF-BRAN', 'active'),
(5717, NULL, 'Disudrin', 'Disudrin (Dosage: 60ml)', 15, 117, '116.00', 12, 679, 'Over the Counter', 'DISUD116-D60ML-DISU-BRAN', 'active'),
(5718, NULL, 'Disudrin', 'Disudrin (Dosage: 120ml)', 15, 84, '82.00', 12, 679, 'Over the Counter', 'DISUD82-D120ML-DISU-BRAN', 'active'),
(5719, NULL, 'Disudrin drops', 'Disudrin drops (Dosage: 15ml)', 15, 36, '76.00', 12, 679, 'Over the Counter', 'DISUDD76-D15ML-DISU-BRAN', 'active'),
(5720, NULL, 'Dolan FP', 'Dolan FP (Dosage: 60ml)', 15, 117, '64.00', 12, 688, 'Over the Counter', 'DOLADF64-D60ML-DOLA-BRAN', 'active'),
(5721, NULL, 'Dolfenal', 'Dolfenal (Dosage: 500mg)', 15, 78, '28.00', 12, 692, 'Over the Counter', 'DOLFD28-D500MG-DOLF-BRAN', 'active'),
(5722, NULL, 'Dolo neurobion', 'Dolo neurobion (Dosage: 1pcs)', 15, 255, '22.00', 12, 691, 'Over the Counter', 'DOLODN22-D1PCS-DOLO-BRAN', 'active'),
(5723, NULL, 'Drenex', 'Drenex (Dosage: 3mg)', 15, 160, '24.00', 12, 690, 'Over the Counter', 'DREND24-D3MG-DREN-BRAN', 'active'),
(5724, NULL, 'Dynatussin', 'Dynatussin (Dosage: 1pcs)', 15, 255, '7.00', 12, 689, 'Over the Counter', 'DYNAD7-D1PCS-DYNA-BRAN', 'active'),
(5725, NULL, 'Dynatussin', 'Dynatussin (Dosage: 60ml)', 15, 117, '95.00', 12, 689, 'Over the Counter', 'DYNAD95-D60ML-DYNA-BRAN', 'active'),
(5726, NULL, 'Dynatussin', 'Dynatussin (Dosage: 120ml)', 15, 84, '84.00', 12, 689, 'Over the Counter', 'DYNAD84-D120ML-DYNA-BRAN', 'active'),
(5727, NULL, 'Enervon', 'Enervon (Dosage: 1pcs)', 15, 255, '1.00', 12, 694, 'Over the Counter', 'ENERE1-D1PCS-ENER-BRAN', 'active'),
(5728, NULL, 'Enervon 30\'s', 'Enervon 30\'s (Dosage: 30pcs)', 15, 501, '193.00', 12, 694, 'Over the Counter', 'ENERE3S193-D30PCS-ENER-BRAN', 'active'),
(5729, NULL, 'Euthyrox', 'Euthyrox (Dosage: 50mcg)', 15, 180, '4.00', 12, 697, 'Over the Counter', 'EUTHE4-D50MCG-EUTH-BRAN', 'active'),
(5730, NULL, 'Euthyrox', 'Euthyrox (Dosage: 100mcg)', 15, 234, '13.50', 12, 697, 'Over the Counter', 'EUTHE13.5-D100MCG-EUTH-BRAN', 'active'),
(5731, NULL, 'Expel ', 'Expel  (Dosage: 60ml)', 15, 117, '94.00', 12, 698, 'Over the Counter', 'EXPEE94-D60ML-EXPE-BRAN', 'active'),
(5732, NULL, 'Expel drops', 'Expel drops (Dosage: 15ml)', 15, 36, '65.00', 12, 698, 'Over the Counter', 'EXPEED65-D15ML-EXPE-BRAN', 'active'),
(5733, NULL, 'Ferlin', 'Ferlin (Dosage: 15ml)', 15, 36, '74.00', 12, 701, 'Over the Counter', 'FERLF74-D15ML-FERL-BRAN', 'active'),
(5734, NULL, 'Fern C', 'Fern C (Dosage: 500mg)', 15, 78, '5.00', 12, 700, 'Over the Counter', 'FERNFC5-D500MG-FERN-BRAN', 'active'),
(5735, NULL, 'Flanax', 'Flanax (Dosage: 550mg)', 15, 539, '22.00', 12, 704, 'Over the Counter', 'FLANF22-D550MG-FLAN-BRAN', 'active'),
(5736, NULL, 'Fluimucil ', 'Fluimucil  (Dosage: 600mg)', 15, 33, '37.00', 12, 703, 'Over the Counter', 'FLUIF37-D600MG-FLUI-BRAN', 'active'),
(5737, NULL, 'Folart', 'Folart (Dosage: 5mg)', 15, 44, '5.00', 12, 707, 'Over the Counter', 'FOLAF5-D5MG-FOLA-BRAN', 'active'),
(5738, NULL, 'Forti-D', 'Forti-D (Dosage: 1pcs)', 15, 255, '2.00', 12, 708, 'Over the Counter', 'FORTFD2-D1PCS-FORT-BRAN', 'active'),
(5739, NULL, 'Gardan', 'Gardan (Dosage: 500mg)', 15, 78, '23.00', 12, 710, 'Over the Counter', 'GARDG23-D500MG-GARD-BRAN', 'active'),
(5740, NULL, 'Gaviscon double action sachet', 'Gaviscon double action sachet (Dosage: 1pcs)', 15, 255, '32.00', 12, 706, 'Over the Counter', 'GAVIGDAS32-D1PCS-GAVI-BRAN', 'active'),
(5741, NULL, 'Gaviscon double action tablet', 'Gaviscon double action tablet (Dosage: 1pcs)', 15, 255, '15.00', 12, 706, 'Over the Counter', 'GAVIGDAT15-D1PCS-GAVI-BRAN', 'active'),
(5742, NULL, 'Gaviscon sachet', 'Gaviscon sachet (Dosage: 1pcs)', 15, 255, '26.00', 12, 706, 'Over the Counter', 'GAVIGS26-D1PCS-GAVI-BRAN', 'active'),
(5743, NULL, 'Gencee', 'Gencee (Dosage: 1pcs)', 15, 255, '1.00', 12, 713, 'Over the Counter', 'GENCG1-D1PCS-GENC-BRAN', 'active'),
(5744, NULL, 'Growee', 'Growee (Dosage: 120ml)', 15, 84, '46.00', 12, 711, 'Over the Counter', 'GROWG46-D120ML-GROW-BRAN', 'active'),
(5745, NULL, 'Growee drops', 'Growee drops (Dosage: 15ml)', 15, 36, '84.00', 12, 711, 'Over the Counter', 'GROWGD84-D15ML-GROW-BRAN', 'active'),
(5746, NULL, 'Hemarate FA', 'Hemarate FA (Dosage: 1pcs)', 15, 255, '18.00', 12, 709, 'Over the Counter', 'HEMAHF18-D1PCS-HEMA-BRAN', 'active'),
(5747, NULL, 'Herbycin', 'Herbycin (Dosage: 60ml)', 15, 117, '50.00', 12, 715, 'Over the Counter', 'HERBH50-D60ML-HERB-BRAN', 'active'),
(5748, NULL, 'Hydrite', 'Hydrite (Dosage: 1pcs)', 15, 255, '15.00', 12, 716, 'Over the Counter', 'HYDRH15-D1PCS-HYDR-BRAN', 'active'),
(5749, NULL, 'Iberet Folic', 'Iberet Folic (Dosage: 1pcs)', 15, 255, '25.00', 12, 721, 'Over the Counter', 'IBERIF25-D1PCS-IBER-BRAN', 'active'),
(5750, NULL, 'Immunpro', 'Immunpro (Dosage: 1pcs)', 15, 255, '3.00', 12, 717, 'Over the Counter', 'IMMUI3-D1PCS-IMMU-BRAN', 'active'),
(5751, NULL, 'Imodium', 'Imodium (Dosage: 1pcs)', 15, 255, '11.00', 12, 722, 'Over the Counter', 'IMODI11-D1PCS-IMOD-BRAN', 'active'),
(5752, NULL, 'K-lyte', 'K-lyte (Dosage: 1pcs)', 15, 255, '14.00', 12, 725, 'Over the Counter', 'KLYTKL14-D1PCS-K-LY-BRAN', 'active'),
(5753, NULL, 'Kool fever adult', 'Kool fever adult (Dosage: 1pcs)', 15, 255, '51.00', 12, 718, 'Over the Counter', 'KOOLKFA51-D1PCS-KOOL-BRAN', 'active'),
(5754, NULL, 'Kool fever babies', 'Kool fever babies (Dosage: 1pcs)', 15, 255, '50.00', 12, 718, 'Over the Counter', 'KOOLKFB50-D1PCS-KOOL-BRAN', 'active'),
(5755, NULL, 'Kool fever kids', 'Kool fever kids (Dosage: 1pcs)', 15, 255, '50.00', 12, 718, 'Over the Counter', 'KOOLKFK50-D1PCS-KOOL-BRAN', 'active'),
(5756, NULL, 'Kremil S', 'Kremil S (Dosage: 1pcs)', 15, 255, '2.00', 12, 719, 'Over the Counter', 'KREMKS2-D1PCS-KREM-BRAN', 'active'),
(5757, NULL, 'Kremil S Advance', 'Kremil S Advance (Dosage: 1pcs)', 15, 255, '18.00', 12, 719, 'Over the Counter', 'KREMKSA18-D1PCS-KREM-BRAN', 'active'),
(5758, NULL, 'Lomotil', 'Lomotil (Dosage: 1pcs)', 15, 255, '5.00', 12, 726, 'Over the Counter', 'LOMOL5-D1PCS-LOMO-BRAN', 'active'),
(5759, NULL, 'Loviscol', 'Loviscol (Dosage: 60ml)', 15, 117, '89.00', 12, 727, 'Over the Counter', 'LOVIL89-D60ML-LOVI-BRAN', 'active'),
(5760, NULL, 'Loviscol drops', 'Loviscol drops (Dosage: 15ml)', 15, 36, '88.00', 12, 727, 'Over the Counter', 'LOVILD88-D15ML-LOVI-BRAN', 'active'),
(5761, NULL, 'Maalox', 'Maalox (Dosage: 1pcs)', 15, 255, '9.00', 12, 730, 'Over the Counter', 'MAALM9-D1PCS-MAAL-BRAN', 'active'),
(5762, NULL, 'Maxvit', 'Maxvit (Dosage: 1pcs)', 15, 255, '10.00', 12, 728, 'Over the Counter', 'MAXVM10-D1PCS-MAXV-BRAN', 'active'),
(5763, NULL, 'Medicol', 'Medicol (Dosage: 200mg)', 15, 100, '1.00', 12, 731, 'Over the Counter', 'MEDIM1-D200MG-MEDI-BRAN', 'active'),
(5764, NULL, 'Medicol', 'Medicol (Dosage: 400mg)', 15, 116, '7.00', 12, 731, 'Over the Counter', 'MEDIM7-D400MG-MEDI-BRAN', 'active'),
(5765, NULL, 'Midol', 'Midol (Dosage: 200mg)', 15, 100, '5.00', 12, 734, 'Over the Counter', 'MIDOM5-D200MG-MIDO-BRAN', 'active'),
(5766, NULL, 'Motillium', 'Motillium (Dosage: 1pcs)', 15, 255, '34.00', 12, 735, 'Over the Counter', 'MOTIM34-D1PCS-MOTI-BRAN', 'active'),
(5767, NULL, 'Myonal', 'Myonal (Dosage: 50mg)', 15, 133, '25.00', 12, 736, 'Over the Counter', 'MYONM25-D50MG-MYON-BRAN', 'active'),
(5768, NULL, 'Myra e', 'Myra e (Dosage: 1pcs)', 15, 255, '8.00', 12, 732, 'Over the Counter', 'MYRAME8-D1PCS-MYRA-BRAN', 'active'),
(5769, NULL, 'Myra e 30\'s', 'Myra e 30\'s (Dosage: 30pcs)', 15, 501, '348.00', 12, 732, 'Over the Counter', 'MYRAME3S348-D30PCS-MYRA-BRAN', 'active'),
(5770, NULL, 'Myra ultimate', 'Myra ultimate (Dosage: 1pcs)', 15, 255, '14.00', 12, 732, 'Over the Counter', 'MYRAMU14-D1PCS-MYRA-BRAN', 'active'),
(5771, NULL, 'Nafarin-A', 'Nafarin-A (Dosage: 1pcs)', 15, 255, '3.00', 12, 739, 'Over the Counter', 'NAFANA3-D1PCS-NAFA-BRAN', 'active'),
(5772, NULL, 'Nasatapp', 'Nasatapp (Dosage: 1pcs)', 15, 255, '3.50', 12, 740, 'Over the Counter', 'NASAN3.5-D1PCS-NASA-BRAN', 'active'),
(5773, NULL, 'Neokidilets', 'Neokidilets (Dosage: 250mg)', 15, 576, '5.00', 12, 741, 'Over the Counter', 'NEOKN5-D250MG-NEOK-BRAN', 'active'),
(5774, NULL, 'Neozep', 'Neozep (Dosage: 500mg)', 15, 78, '4.00', 12, 742, 'Over the Counter', 'NEOZN4-D500MG-NEOZ-BRAN', 'active'),
(5775, NULL, 'Neozep', 'Neozep (Dosage: 60ml)', 15, 117, '74.00', 12, 742, 'Over the Counter', 'NEOZN74-D60ML-NEOZ-BRAN', 'active'),
(5776, NULL, 'Neozep drops', 'Neozep drops (Dosage: 15ml)', 15, 36, '83.00', 12, 742, 'Over the Counter', 'NEOZND83-D15ML-NEOZ-BRAN', 'active'),
(5777, NULL, 'Neozep non drowse', 'Neozep non drowse (Dosage: 1pcs)', 15, 255, '6.00', 12, 742, 'Over the Counter', 'NEOZNND6-D1PCS-NEOZ-BRAN', 'active'),
(5778, NULL, 'Neurobion', 'Neurobion (Dosage: 1pcs)', 15, 255, '19.00', 12, 746, 'Over the Counter', 'NEURN19-D1PCS-NEUR-BRAN', 'active'),
(5779, NULL, 'Neurogen-E', 'Neurogen-E (Dosage: 1pcs)', 15, 255, '9.00', 12, 748, 'Over the Counter', 'NEURNE9-D1PCS-NEUR-BRAN', 'active'),
(5780, NULL, 'Nizoral Shampoo', 'Nizoral Shampoo (Dosage: 1pcs)', 15, 255, '61.00', 12, 749, 'Over the Counter', 'NIZONS61-D1PCS-NIZO-BRAN', 'active'),
(5781, NULL, 'Norgesic Forte', 'Norgesic Forte (Dosage: 1pcs)', 15, 255, '36.00', 12, 750, 'Over the Counter', 'NORGNF36-D1PCS-NORG-BRAN', 'active'),
(5782, NULL, 'Nutrilin', 'Nutrilin (Dosage: 120ml)', 15, 84, '73.00', 12, 751, 'Over the Counter', 'NUTRN73-D120ML-NUTR-BRAN', 'active'),
(5783, NULL, 'Nutrilin drops', 'Nutrilin drops (Dosage: 15ml)', 15, 36, '48.00', 12, 751, 'Over the Counter', 'NUTRND48-D15ML-NUTR-BRAN', 'active'),
(5784, NULL, 'Nutroplex', 'Nutroplex (Dosage: 120ml)', 15, 84, '64.00', 12, 752, 'Over the Counter', 'NUTRN64-D120ML-NUTR-BRAN', 'active'),
(5785, NULL, 'Pedialyte Apple', 'Pedialyte Apple (Dosage: 1pcs)', 15, 255, '72.00', 12, 754, 'Over the Counter', 'PEDIPA72-D1PCS-PEDI-BRAN', 'active'),
(5786, NULL, 'Pedialyte Grapes', 'Pedialyte Grapes (Dosage: 1pcs)', 15, 255, '74.00', 12, 754, 'Over the Counter', 'PEDIPG74-D1PCS-PEDI-BRAN', 'active'),
(5787, NULL, 'Pediamox', 'Pediamox (Dosage: 15ml)', 15, 36, '77.00', 12, 756, 'Over the Counter', 'PEDIP77-D15ML-PEDI-BRAN', 'active'),
(5788, NULL, 'Pedzinc', 'Pedzinc (Dosage: 120ml)', 15, 84, '56.00', 12, 755, 'Over the Counter', 'PEDZP56-D120ML-PEDZ-BRAN', 'active'),
(5789, NULL, 'Pedzinc', 'Pedzinc (Dosage: 240ml)', 15, 592, '79.00', 12, 755, 'Over the Counter', 'PEDZP79-D240ML-PEDZ-BRAN', 'active'),
(5790, NULL, 'Pharex B complex', 'Pharex B complex (Dosage: 1pcs)', 15, 255, '6.00', 12, 762, 'Over the Counter', 'PHARPBC6-D1PCS-PHAR-BRAN', 'active'),
(5791, NULL, 'Plemex adult', 'Plemex adult (Dosage: 60ml)', 15, 117, '61.00', 12, 753, 'Over the Counter', 'PLEMPA61-D60ML-PLEM-BRAN', 'active'),
(5792, NULL, 'Plemex adult', 'Plemex adult (Dosage: 120ml)', 15, 84, '71.00', 12, 753, 'Over the Counter', 'PLEMPA71-D120ML-PLEM-BRAN', 'active'),
(5793, NULL, 'Plemex cap', 'Plemex cap (Dosage: 600mg)', 15, 33, '4.00', 12, 753, 'Over the Counter', 'PLEMPC4-D600MG-PLEM-BRAN', 'active'),
(5794, NULL, 'Plemex kids', 'Plemex kids (Dosage: 60ml)', 15, 117, '60.00', 12, 753, 'Over the Counter', 'PLEMPK60-D60ML-PLEM-BRAN', 'active'),
(5795, NULL, 'Ponstan SF', 'Ponstan SF (Dosage: 500mg)', 15, 78, '37.00', 12, 763, 'Over the Counter', 'PONSPS37-D500MG-PONS-BRAN', 'active'),
(5796, NULL, 'Ponstan SF', 'Ponstan SF (Dosage: 250mg)', 15, 576, '15.00', 12, 763, 'Over the Counter', 'PONSPS15-D250MG-PONS-BRAN', 'active'),
(5797, NULL, 'Poten-cee', 'Poten-cee (Dosage: 1000mg)', 15, 601, '9.00', 12, 768, 'Over the Counter', 'POTEPC9-D1000MG-POTE-BRAN', 'active'),
(5798, NULL, 'Poten-cee ', 'Poten-cee  (Dosage: 500mg)', 15, 78, '2.00', 12, 768, 'Over the Counter', 'POTEPC2-D500MG-POTE-BRAN', 'active'),
(5799, NULL, 'Propan TLC', 'Propan TLC (Dosage: 120ml)', 15, 84, '70.00', 12, 764, 'Over the Counter', 'PROPPT70-D120ML-PROP-BRAN', 'active'),
(5800, NULL, 'Propan TLC', 'Propan TLC (Dosage: 60ml)', 15, 117, '70.00', 12, 764, 'Over the Counter', 'PROPPT70-D60ML-PROP-BRAN', 'active'),
(5801, NULL, 'Propan with iron cap', 'Propan with iron cap (Dosage: 1pcs)', 15, 255, '20.00', 12, 764, 'Over the Counter', 'PROPPWIC20-D1PCS-PROP-BRAN', 'active'),
(5802, NULL, 'Provera', 'Provera (Dosage: 10mg)', 15, 45, '86.00', 12, 771, 'Over the Counter', 'PROVP86-D10MG-PROV-BRAN', 'active'),
(5803, NULL, 'Re-leaf', 'Re-leaf (Dosage: 1pcs)', 15, 255, '4.00', 12, 766, 'Over the Counter', 'RELERL4-D1PCS-RE-L-BRAN', 'active'),
(5804, NULL, 'Restime drops', 'Restime drops (Dosage: 15ml)', 15, 36, '85.00', 12, 772, 'Over the Counter', 'RESTRD85-D15ML-REST-BRAN', 'active'),
(5805, NULL, 'Revicon', 'Revicon (Dosage: 1pcs)', 15, 255, '1.00', 12, 773, 'Over the Counter', 'REVIR1-D1PCS-REVI-BRAN', 'active'),
(5806, NULL, 'Rexidol', 'Rexidol (Dosage: 1pcs)', 15, 255, '3.00', 12, 774, 'Over the Counter', 'REXIR3-D1PCS-REXI-BRAN', 'active'),
(5807, NULL, 'Ritemed Amlodipine', 'Ritemed Amlodipine (Dosage: 10mg)', 15, 45, '7.00', 12, 775, 'Over the Counter', 'RITERA7-D10MG-RITE-BRAN', 'active'),
(5808, NULL, 'RItemed Amlodipine ', 'RItemed Amlodipine  (Dosage: 5mg)', 15, 44, '2.00', 12, 775, 'Over the Counter', 'RITERA2-D5MG-RITE-BRAN', 'active'),
(5809, NULL, 'Ritemed Losartan', 'Ritemed Losartan (Dosage: 100mg)', 15, 31, '12.00', 12, 775, 'Over the Counter', 'RITERL12-D100MG-RITE-BRAN', 'active'),
(5810, NULL, 'Ritemed Losartan ', 'Ritemed Losartan  (Dosage: 50mg)', 15, 133, '8.00', 12, 775, 'Over the Counter', 'RITERL8-D50MG-RITE-BRAN', 'active'),
(5811, NULL, 'Ritemed Mefenamic', 'Ritemed Mefenamic (Dosage: 500mg)', 15, 78, '4.00', 12, 775, 'Over the Counter', 'RITERM4-D500MG-RITE-BRAN', 'active'),
(5812, NULL, 'Ritemed Metformin', 'Ritemed Metformin (Dosage: 500mg)', 15, 78, '-1.00', 12, 775, 'Over the Counter', 'RITERM-1-D500MG-RITE-BRAN', 'active'),
(5813, NULL, 'Robitussin', 'Robitussin (Dosage: 60ml)', 15, 117, '84.00', 12, 781, 'Over the Counter', 'ROBIR84-D60ML-ROBI-BRAN', 'active'),
(5814, NULL, 'Robitussin ', 'Robitussin  (Dosage: 120ml)', 15, 84, '82.00', 12, 781, 'Over the Counter', 'ROBIR82-D120ML-ROBI-BRAN', 'active'),
(5815, NULL, 'Robitussin cap', 'Robitussin cap (Dosage: 200mg)', 15, 100, '8.00', 12, 781, 'Over the Counter', 'ROBIRC8-D200MG-ROBI-BRAN', 'active'),
(5816, NULL, 'Robitussin DM', 'Robitussin DM (Dosage: 60ml)', 15, 117, '57.00', 12, 781, 'Over the Counter', 'ROBIRD57-D60ML-ROBI-BRAN', 'active'),
(5817, NULL, 'Robitussin DM', 'Robitussin DM (Dosage: 120ml)', 15, 84, '65.00', 12, 781, 'Over the Counter', 'ROBIRD65-D120ML-ROBI-BRAN', 'active'),
(5818, NULL, 'Robokids', 'Robokids (Dosage: 250mg/60ml)', 15, 81, '74.00', 12, 784, 'Over the Counter', 'ROBOR74-D250MG60ML-ROBO-BRAN', 'active'),
(5819, NULL, 'Salinase drops', 'Salinase drops (Dosage: 30ml)', 15, 323, '91.00', 12, 787, 'Over the Counter', 'SALISD91-D30ML-SALI-BRAN', 'active'),
(5820, NULL, 'Salinase Spray', 'Salinase Spray (Dosage: 30ml)', 15, 323, '71.00', 12, 787, 'Over the Counter', 'SALISS71-D30ML-SALI-BRAN', 'active'),
(5821, NULL, 'Sangobion', 'Sangobion (Dosage: 1pcs)', 15, 255, '19.00', 12, 789, 'Over the Counter', 'SANGS19-D1PCS-SANG-BRAN', 'active'),
(5822, NULL, 'Saridon', 'Saridon (Dosage: 1pcs)', 15, 255, '4.00', 12, 790, 'Over the Counter', 'SARIS4-D1PCS-SARI-BRAN', 'active'),
(5823, NULL, 'Simeco', 'Simeco (Dosage: 1pcs)', 15, 255, '1.00', 12, 791, 'Over the Counter', 'SIMES1-D1PCS-SIME-BRAN', 'active'),
(5824, NULL, 'Sinecod Forte', 'Sinecod Forte (Dosage: 50mg)', 15, 133, '18.00', 12, 792, 'Over the Counter', 'SINESF18-D50MG-SINE-BRAN', 'active'),
(5825, NULL, 'Sinupret', 'Sinupret (Dosage: 1pcs)', 15, 255, '10.00', 12, 793, 'Over the Counter', 'SINUS10-D1PCS-SINU-BRAN', 'active'),
(5826, NULL, 'Skelan', 'Skelan (Dosage: 220mg)', 15, 630, '4.00', 12, 794, 'Over the Counter', 'SKELS4-D220MG-SKEL-BRAN', 'active'),
(5827, NULL, 'Skelan', 'Skelan (Dosage: 550mg)', 15, 539, '14.00', 12, 794, 'Over the Counter', 'SKELS14-D550MG-SKEL-BRAN', 'active'),
(5828, NULL, 'Sleepasil', 'Sleepasil (Dosage: 1pcs)', 15, 255, '14.00', 12, 800, 'Over the Counter', 'SLEES14-D1PCS-SLEE-BRAN', 'active'),
(5829, NULL, 'Sleepwell', 'Sleepwell (Dosage: 1pcs)', 15, 255, '12.00', 12, 796, 'Over the Counter', 'SLEES12-D1PCS-SLEE-BRAN', 'active'),
(5830, NULL, 'Sodium Bicarbonate 100\'s', 'Sodium Bicarbonate 100\'s (Dosage: 325mg)', 15, 149, '75.00', 12, 797, 'Over the Counter', 'SODISB1S75-D325MG-SODI-BRAN', 'active'),
(5831, NULL, 'Solmux', 'Solmux (Dosage: 1pcs)', 15, 255, '9.00', 12, 798, 'Over the Counter', 'SOLMS9-D1PCS-SOLM-BRAN', 'active'),
(5832, NULL, 'Solmux adult', 'Solmux adult (Dosage: 60ml)', 15, 117, '47.00', 12, 798, 'Over the Counter', 'SOLMSA47-D60ML-SOLM-BRAN', 'active'),
(5833, NULL, 'Solmux Advance', 'Solmux Advance (Dosage: 1pcs)', 15, 255, '11.00', 12, 798, 'Over the Counter', 'SOLMSA11-D1PCS-SOLM-BRAN', 'active'),
(5834, NULL, 'Solmux Broncho', 'Solmux Broncho (Dosage: 1pcs)', 15, 255, '10.00', 12, 798, 'Over the Counter', 'SOLMSB10-D1PCS-SOLM-BRAN', 'active'),
(5835, NULL, 'Solmux drops', 'Solmux drops (Dosage: 15ml)', 15, 36, '74.00', 12, 798, 'Over the Counter', 'SOLMSD74-D15ML-SOLM-BRAN', 'active'),
(5836, NULL, 'Solmux kids', 'Solmux kids (Dosage: 200mg/60ml)', 15, 640, '66.00', 12, 798, 'Over the Counter', 'SOLMSK66-D200MG60ML-SOLM-BRAN', 'active'),
(5837, NULL, 'Stresstabs', 'Stresstabs (Dosage: 1pcs)', 15, 255, '9.00', 12, 805, 'Over the Counter', 'STRES9-D1PCS-STRE-BRAN', 'active'),
(5838, NULL, 'Stresstabs 30\'s', 'Stresstabs 30\'s (Dosage: 30pcs)', 15, 501, '307.00', 12, 805, 'Over the Counter', 'STRES3S307-D30PCS-STRE-BRAN', 'active'),
(5839, NULL, 'Tempa ', 'Tempa  (Dosage: 120/120ml)', 15, 646, '71.00', 12, 806, 'Over the Counter', 'TEMPT71-D120120ML-TEMP-BRAN', 'active'),
(5840, NULL, 'Tempra', 'Tempra (Dosage: 250mg/60ml)', 15, 81, '76.00', 12, 807, 'Over the Counter', 'TEMPT76-D250MG60ML-TEMP-BRAN', 'active'),
(5841, NULL, 'Tempra', 'Tempra (Dosage: 250mg/120ml)', 15, 648, '88.00', 12, 807, 'Over the Counter', 'TEMPT88-D250MG120ML-TEMP-BRAN', 'active'),
(5842, NULL, 'Tempra ', 'Tempra  (Dosage: 120mg/60ml)', 15, 483, '65.00', 12, 807, 'Over the Counter', 'TEMPT65-D120MG60ML-TEMP-BRAN', 'active'),
(5843, NULL, 'Tempra drops', 'Tempra drops (Dosage: 15ml)', 15, 36, '53.00', 12, 807, 'Over the Counter', 'TEMPTD53-D15ML-TEMP-BRAN', 'active'),
(5844, NULL, 'Tempra drops', 'Tempra drops (Dosage: 30ml)', 15, 323, '79.00', 12, 807, 'Over the Counter', 'TEMPTD79-D30ML-TEMP-BRAN', 'active'),
(5845, NULL, 'Tempra tab', 'Tempra tab (Dosage: 500mg)', 15, 78, '5.00', 12, 807, 'Over the Counter', 'TEMPTT5-D500MG-TEMP-BRAN', 'active'),
(5846, NULL, 'Tiki Tiki Plus drops', 'Tiki Tiki Plus drops (Dosage: 15ml)', 15, 36, '62.00', 12, 811, 'Over the Counter', 'TIKITTPD62-D15ML-TIKI-BRAN', 'active'),
(5847, NULL, 'Tiki Tiki Plus drops', 'Tiki Tiki Plus drops (Dosage: 30ml)', 15, 323, '49.00', 12, 811, 'Over the Counter', 'TIKITTPD49-D30ML-TIKI-BRAN', 'active'),
(5848, NULL, 'Tiki Tiki Star', 'Tiki Tiki Star (Dosage: 60ml)', 15, 117, '86.00', 12, 811, 'Over the Counter', 'TIKITTS86-D60ML-TIKI-BRAN', 'active'),
(5849, NULL, 'Tiki Tiki Star', 'Tiki Tiki Star (Dosage: 120ml)', 15, 84, '58.00', 12, 811, 'Over the Counter', 'TIKITTS58-D120ML-TIKI-BRAN', 'active'),
(5850, NULL, 'Tuseran', 'Tuseran (Dosage: 15mg)', 15, 194, '5.00', 12, 819, 'Over the Counter', 'TUSET5-D15MG-TUSE-BRAN', 'active'),
(5851, NULL, 'Tuseran', 'Tuseran (Dosage: 25mg)', 15, 104, '5.00', 12, 819, 'Over the Counter', 'TUSET5-D25MG-TUSE-BRAN', 'active'),
(5852, NULL, 'Tuseran', 'Tuseran (Dosage: 325mg)', 15, 149, '8.00', 12, 819, 'Over the Counter', 'TUSET8-D325MG-TUSE-BRAN', 'active'),
(5853, NULL, 'UH ferrous 100\'s', 'UH ferrous 100\'s (Dosage: 65mg)', 15, 660, '171.00', 12, 822, 'Over the Counter', 'UHFEUF1S171-D65MG-UH-BRAN', 'active'),
(5854, NULL, 'Ventolin nebule', 'Ventolin nebule (Dosage: 1pcs)', 15, 255, '35.00', 12, 818, 'Over the Counter', 'VENTVN35-D1PCS-VENT-BRAN', 'active'),
(5855, NULL, 'Ventolin tablet', 'Ventolin tablet (Dosage: 2mg)', 15, 182, '18.00', 12, 818, 'Over the Counter', 'VENTVT18-D2MG-VENT-BRAN', 'active'),
(5856, NULL, 'Vicks Formula 44', 'Vicks Formula 44 (Dosage: 100ml)', 15, 57, '176.00', 12, 507, 'Over the Counter', 'VICKVF4176-D100ML-VICK-BRAN', 'active'),
(5857, NULL, 'Vicks Formula 44', 'Vicks Formula 44 (Dosage: 54ml)', 15, 661, '62.00', 12, 507, 'Over the Counter', 'VICKVF462-D54ML-VICK-BRAN', 'active'),
(5858, NULL, 'Virlix', 'Virlix (Dosage: 10mg)', 15, 45, '24.00', 12, 826, 'Over the Counter', 'VIRLV24-D10MG-VIRL-BRAN', 'active'),
(5859, NULL, 'Zykast', 'Zykast (Dosage: 1pcs)', 15, 255, '27.50', 12, 827, 'Over the Counter', 'ZYKAZ27.5-D1PCS-ZYKA-BRAN', 'active'),
(5860, NULL, 'Ener-A Multivitamins', 'Ener-A Multivitamins (Dosage: 120ml)', 15, 84, '149.00', 12, 828, 'Over the Counter', 'ENEREAM149-D120ML-ENER-BRAN', 'active'),
(5861, NULL, 'Acetone (Bobbie)', 'Acetone (Bobbie) (Unit: 30ml)', 30, 323, '22.00', 18, 830, 'Over the Counter', 'ACETAB22-U30ML-ACET-MERC', 'active'),
(5862, NULL, 'Apollo Petroleum Jelly', 'Apollo Petroleum Jelly (Unit: 25g)', 30, 324, '71.00', 18, 829, 'Over the Counter', 'APOLAPJ71-U25G-APOL-MERC', 'active'),
(5863, NULL, 'Axe roll on apollo', 'Axe roll on apollo (Unit: 50ml)', 30, 276, '9.00', 18, 831, 'Over the Counter', 'AXERAROA9-U50ML-AXE-MERC', 'active'),
(5864, NULL, 'Axe roll on apollo', 'Axe roll on apollo (Unit: 25ml)', 30, 275, '55.00', 18, 831, 'Over the Counter', 'AXERAROA55-U25ML-AXE-MERC', 'active'),
(5865, NULL, 'Axe roll on dark temptation ', 'Axe roll on dark temptation  (Unit: 25ml)', 30, 275, '54.00', 18, 831, 'Over the Counter', 'AXERARODT54-U25ML-AXE-MERC', 'active'),
(5866, NULL, 'Axe roll on ice chill ', 'Axe roll on ice chill  (Unit: 50ml)', 30, 276, '128.00', 18, 831, 'Over the Counter', 'AXERAROIC128-U50ML-AXE-MERC', 'active'),
(5867, NULL, 'Axe spray dark temptation', 'Axe spray dark temptation (Unit: 50ml)', 30, 276, '96.00', 18, 831, 'Over the Counter', 'AXESASDT96-U50ML-AXE-MERC', 'active'),
(5868, NULL, 'Axe spray gold temptation', 'Axe spray gold temptation (Unit: 50ml)', 30, 276, '94.00', 18, 831, 'Over the Counter', 'AXESASGT94-U50ML-AXE-MERC', 'active'),
(5869, NULL, 'Baby flo Breat pump', 'Baby flo Breat pump (Unit: 1pcs)', 30, 255, '104.00', 18, 834, 'Over the Counter', 'BABYBFBP104-U1PCS-BABY-MERC', 'active'),
(5870, NULL, 'Baby flo pacifier', 'Baby flo pacifier (Unit: 1pcs)', 30, 255, '93.00', 18, 834, 'Over the Counter', 'BABYBFP93-U1PCS-BABY-MERC', 'active'),
(5871, NULL, 'Baby Joy nipple large', 'Baby Joy nipple large (Unit: 1pcs)', 30, 255, '18.00', 18, 834, 'Over the Counter', 'BABYBJNL18-U1PCS-BABY-MERC', 'active'),
(5872, NULL, 'Baby Joy nipple medium', 'Baby Joy nipple medium (Unit: 1pcs)', 30, 255, '14.00', 18, 834, 'Over the Counter', 'BABYBJNM14-U1PCS-BABY-MERC', 'active'),
(5873, NULL, 'Baby Joy nipple small', 'Baby Joy nipple small (Unit: 1pcs)', 30, 255, '17.00', 18, 834, 'Over the Counter', 'BABYBJNS17-U1PCS-BABY-MERC', 'active'),
(5874, NULL, 'Baby Joy pacifier', 'Baby Joy pacifier (Unit: 1pcs)', 30, 255, '47.00', 18, 834, 'Over the Counter', 'BABYBJP47-U1PCS-BABY-MERC', 'active'),
(5875, NULL, 'Bench atlantis', 'Bench atlantis (Unit: 75ml)', 30, 54, '91.00', 18, 843, 'Over the Counter', 'BENCBA91-U75ML-BENC-MERC', 'active'),
(5876, NULL, 'Bench Daily scent', 'Bench Daily scent (Unit: 50ml)', 30, 276, '29.00', 18, 843, 'Over the Counter', 'BENCBDS29-U50ML-BENC-MERC', 'active'),
(5877, NULL, 'Bench eight', 'Bench eight (Unit: 75ml)', 30, 54, '94.00', 18, 843, 'Over the Counter', 'BENCBE94-U75ML-BENC-MERC', 'active'),
(5878, NULL, 'Bench eight', 'Bench eight (Unit: 100ml)', 30, 57, '125.00', 18, 843, 'Over the Counter', 'BENCBE125-U100ML-BENC-MERC', 'active'),
(5879, NULL, 'Bench so in love', 'Bench so in love (Unit: 100ml)', 30, 57, '129.00', 18, 843, 'Over the Counter', 'BENCBSIL129-U100ML-BENC-MERC', 'active'),
(5880, NULL, 'Bench so in love ', 'Bench so in love  (Unit: 50ml)', 30, 276, '80.00', 18, 843, 'Over the Counter', 'BENCBSIL80-U50ML-BENC-MERC', 'active'),
(5881, NULL, 'Betadine', 'Betadine (Unit: 30ml)', 30, 323, '72.00', 18, 639, 'Over the Counter', 'BETAB72-U30ML-BETA-MERC', 'active'),
(5882, NULL, 'Betadine', 'Betadine (Unit: 15ml)', 30, 36, '64.00', 18, 639, 'Over the Counter', 'BETAB64-U15ML-BETA-MERC', 'active'),
(5883, NULL, 'Betadine', 'Betadine (Unit: 7.5ml)', 30, 688, '83.00', 18, 639, 'Over the Counter', 'BETAB83-U75ML-BETA-MERC', 'active'),
(5884, NULL, 'Bigen black', 'Bigen black (Unit: 1pcs)', 30, 255, '50.00', 18, 850, 'Over the Counter', 'BIGEBB50-U1PCS-BIGE-MERC', 'active'),
(5885, NULL, 'Bigen brown black', 'Bigen brown black (Unit: 1pcs)', 30, 255, '51.00', 18, 850, 'Over the Counter', 'BIGEBBB51-U1PCS-BIGE-MERC', 'active'),
(5886, NULL, 'Bigen Chestnut brown', 'Bigen Chestnut brown (Unit: 1pcs)', 30, 255, '52.00', 18, 850, 'Over the Counter', 'BIGEBCB52-U1PCS-BIGE-MERC', 'active'),
(5887, NULL, 'Bigen dark brown', 'Bigen dark brown (Unit: 1pcs)', 30, 255, '54.00', 18, 850, 'Over the Counter', 'BIGEBDB54-U1PCS-BIGE-MERC', 'active'),
(5888, NULL, 'Bon Bon Feeding bottle', 'Bon Bon Feeding bottle (Unit: 8oz)', 30, 690, '66.00', 18, 859, 'Over the Counter', 'BONBBBFB66-U8Z-BON-MERC', 'active'),
(5889, NULL, 'Caronia (Colorless)', 'Caronia (Colorless) (Unit: 8ml)', 30, 693, '26.00', 18, 858, 'Over the Counter', 'CAROCC26-U8ML-CARO-MERC', 'active'),
(5890, NULL, 'Casino Alcohol Femme', 'Casino Alcohol Femme (Unit: 500ml)', 30, 694, '80.00', 18, 856, 'Over the Counter', 'CASICAF80-U500ML-CASI-MERC', 'active'),
(5891, NULL, 'Casino Alcohol Femme', 'Casino Alcohol Femme (Unit: 250ml)', 30, 497, '62.00', 18, 856, 'Over the Counter', 'CASICAF62-U250ML-CASI-MERC', 'active'),
(5892, NULL, 'Casino Alcohol Femme', 'Casino Alcohol Femme (Unit: 150ml)', 30, 699, '91.00', 18, 856, 'Over the Counter', 'CASICAF91-U150ML-CASI-MERC', 'active'),
(5893, NULL, 'Casino Alcohol Regular', 'Casino Alcohol Regular (Unit: 500ml)', 30, 694, '79.00', 18, 856, 'Over the Counter', 'CASICAR79-U500ML-CASI-MERC', 'active'),
(5894, NULL, 'Casino Alcohol Regular', 'Casino Alcohol Regular (Unit: 250ml)', 30, 497, '91.00', 18, 856, 'Over the Counter', 'CASICAR91-U250ML-CASI-MERC', 'active'),
(5895, NULL, 'Casino Alcohol Regular', 'Casino Alcohol Regular (Unit: 150ml)', 30, 699, '82.00', 18, 856, 'Over the Counter', 'CASICAR82-U150ML-CASI-MERC', 'active'),
(5896, NULL, 'Casino Alcohol Regular', 'Casino Alcohol Regular (Unit: 60ml)', 30, 117, '70.00', 18, 856, 'Over the Counter', 'CASICAR70-U60ML-CASI-MERC', 'active'),
(5897, NULL, 'Colgate Plax', 'Colgate Plax (Unit: 60ml)', 30, 117, '33.00', 18, 865, 'Over the Counter', 'COLGCP33-U60ML-COLG-MERC', 'active'),
(5898, NULL, 'Colgate toothpaste', 'Colgate toothpaste (Unit: 2x195g)', 30, 698, '157.00', 18, 865, 'Over the Counter', 'COLGCT157-U2X195G-COLG-MERC', 'active'),
(5899, NULL, 'Colgate toothpaste', 'Colgate toothpaste (Unit: 2x132g)', 30, 697, '123.00', 18, 865, 'Over the Counter', 'COLGCT123-U2X132G-COLG-MERC', 'active'),
(5900, NULL, 'Colgate toothpaste', 'Colgate toothpaste (Unit: 145ml)', 30, 704, '134.00', 18, 865, 'Over the Counter', 'COLGCT134-U145ML-COLG-MERC', 'active'),
(5901, NULL, 'Colgate toothpaste', 'Colgate toothpaste (Unit: 95ml)', 30, 705, '98.00', 18, 865, 'Over the Counter', 'COLGCT98-U95ML-COLG-MERC', 'active'),
(5902, NULL, 'Colgate toothpaste', 'Colgate toothpaste (Unit: 50ml)', 30, 276, '64.00', 18, 865, 'Over the Counter', 'COLGCT64-U50ML-COLG-MERC', 'active'),
(5903, NULL, 'Colgate toothpaste', 'Colgate toothpaste (Unit: 25ml)', 30, 275, '38.00', 18, 865, 'Over the Counter', 'COLGCT38-U25ML-COLG-MERC', 'active'),
(5904, NULL, 'Colgate toothpaste kids', 'Colgate toothpaste kids (Unit: 40g)', 30, 710, '38.00', 18, 865, 'Over the Counter', 'COLGCTK38-U40G-COLG-MERC', 'active'),
(5905, NULL, 'Cuticle remover', 'Cuticle remover (Unit: 60ml)', 30, 117, '88.00', 18, 869, 'Over the Counter', 'CUTICR88-U60ML-CUTI-MERC', 'active'),
(5906, NULL, 'Doctor J Ethyl Alcohol', 'Doctor J Ethyl Alcohol (Unit: 500ml)', 30, 694, '53.00', 18, 874, 'Over the Counter', 'DOCTDJEA53-U500ML-DOCT-MERC', 'active'),
(5907, NULL, 'Doctor J Isopropyl Alcohol', 'Doctor J Isopropyl Alcohol (Unit: 500ml)', 30, 694, '84.00', 18, 874, 'Over the Counter', 'DOCTDJIA84-U500ML-DOCT-MERC', 'active'),
(5908, NULL, 'Dove deo invisible dry', 'Dove deo invisible dry (Unit: 50ml)', 30, 276, '129.00', 18, 876, 'Over the Counter', 'DOVEDDID129-U50ML-DOVE-MERC', 'active'),
(5909, NULL, 'Dove deo original', 'Dove deo original (Unit: 25ml)', 30, 275, '52.00', 18, 876, 'Over the Counter', 'DOVEDDO52-U25ML-DOVE-MERC', 'active'),
(5910, NULL, 'Dove deo original', 'Dove deo original (Unit: 50ml)', 30, 276, '49.00', 18, 876, 'Over the Counter', 'DOVEDDO49-U50ML-DOVE-MERC', 'active'),
(5911, NULL, 'Eskinol classic glow', 'Eskinol classic glow (Unit: 75ml)', 30, 54, '39.00', 18, 138, 'Over the Counter', 'ESKIECG39-U75ML-ESKI-MERC', 'active'),
(5912, NULL, 'Eskinol classic glow', 'Eskinol classic glow (Unit: 135ml)', 30, 52, '62.00', 18, 138, 'Over the Counter', 'ESKIECG62-U135ML-ESKI-MERC', 'active'),
(5913, NULL, 'Eskinol classic glow with grains', 'Eskinol classic glow with grains (Unit: 135ml)', 30, 52, '65.00', 18, 138, 'Over the Counter', 'ESKIECGWG65-U135ML-ESKI-MERC', 'active'),
(5914, NULL, 'Eskinol classic glow with grains', 'Eskinol classic glow with grains (Unit: 75ml)', 30, 54, '41.00', 18, 138, 'Over the Counter', 'ESKIECGWG41-U75ML-ESKI-MERC', 'active'),
(5915, NULL, 'Eskinol Micellar clear', 'Eskinol Micellar clear (Unit: 100ml)', 30, 57, '67.00', 18, 138, 'Over the Counter', 'ESKIEMC67-U100ML-ESKI-MERC', 'active'),
(5916, NULL, 'Eskinol Micellar clear', 'Eskinol Micellar clear (Unit: 10g)', 30, 59, '9.00', 18, 138, 'Over the Counter', 'ESKIEMC9-U10G-ESKI-MERC', 'active'),
(5917, NULL, 'Eskinol Micellar glow', 'Eskinol Micellar glow (Unit: 100ml)', 30, 57, '67.00', 18, 138, 'Over the Counter', 'ESKIEMG67-U100ML-ESKI-MERC', 'active'),
(5918, NULL, 'Eskinol Micellar glow', 'Eskinol Micellar glow (Unit: 10g)', 30, 59, '9.00', 18, 138, 'Over the Counter', 'ESKIEMG9-U10G-ESKI-MERC', 'active'),
(5919, NULL, 'Eskinol Micellar hydrate', 'Eskinol Micellar hydrate (Unit: 100ml)', 30, 57, '64.00', 18, 138, 'Over the Counter', 'ESKIEMH64-U100ML-ESKI-MERC', 'active'),
(5920, NULL, 'Eskinol papaya', 'Eskinol papaya (Unit: 75ml)', 30, 54, '37.00', 18, 138, 'Over the Counter', 'ESKIEP37-U75ML-ESKI-MERC', 'active'),
(5921, NULL, 'Eskinol papaya', 'Eskinol papaya (Unit: 135ml)', 30, 52, '63.00', 18, 138, 'Over the Counter', 'ESKIEP63-U135ML-ESKI-MERC', 'active'),
(5922, NULL, 'Eskinol pimple fighting', 'Eskinol pimple fighting (Unit: 75ml)', 30, 54, '39.00', 18, 138, 'Over the Counter', 'ESKIEPF39-U75ML-ESKI-MERC', 'active'),
(5923, NULL, 'Eskinol pimple fighting', 'Eskinol pimple fighting (Unit: 135ml)', 30, 52, '65.00', 18, 138, 'Over the Counter', 'ESKIEPF65-U135ML-ESKI-MERC', 'active'),
(5924, NULL, 'Eskinol pimple fighting', 'Eskinol pimple fighting (Unit: 225ml)', 30, 68, '106.00', 18, 138, 'Over the Counter', 'ESKIEPF106-U225ML-ESKI-MERC', 'active'),
(5925, NULL, 'Eskinol spot less glow', 'Eskinol spot less glow (Unit: 75ml)', 30, 54, '39.00', 18, 138, 'Over the Counter', 'ESKIESLG39-U75ML-ESKI-MERC', 'active'),
(5926, NULL, 'Eskinol spot less glow', 'Eskinol spot less glow (Unit: 135ml)', 30, 52, '58.00', 18, 138, 'Over the Counter', 'ESKIESLG58-U135ML-ESKI-MERC', 'active'),
(5927, NULL, 'Eskinol teens', 'Eskinol teens (Unit: 75ml)', 30, 54, '37.00', 18, 138, 'Over the Counter', 'ESKIET37-U75ML-ESKI-MERC', 'active'),
(5928, NULL, 'Farlin Large', 'Farlin Large (Unit: 1pcs)', 30, 255, '20.00', 18, 895, 'Over the Counter', 'FARLFL20-U1PCS-FARL-MERC', 'active'),
(5929, NULL, 'Farlin Medium', 'Farlin Medium (Unit: 1pcs)', 30, 255, '21.00', 18, 895, 'Over the Counter', 'FARLFM21-U1PCS-FARL-MERC', 'active'),
(5930, NULL, 'Femme Tissue 24\'s', 'Femme Tissue 24\'s (Unit: 24pcs)', 30, 733, '187.00', 18, 898, 'Over the Counter', 'FEMMFT2S187-U24PCS-FEMM-MERC', 'active'),
(5931, NULL, 'Femme Tissue 4\'s', 'Femme Tissue 4\'s (Unit: 4pcs)', 30, 738, '34.00', 18, 898, 'Over the Counter', 'FEMMFT4S34-U4PCS-FEMM-MERC', 'active'),
(5932, NULL, 'Femme Tissue roll', 'Femme Tissue roll (Unit: 1pcs)', 30, 255, '5.00', 18, 898, 'Over the Counter', 'FEMMFTR5-U1PCS-FEMM-MERC', 'active'),
(5933, NULL, 'Fiona cologne spray', 'Fiona cologne spray (Unit: 50ml)', 30, 276, '34.00', 18, 903, 'Over the Counter', 'FIONFCS34-U50ML-FION-MERC', 'active'),
(5934, NULL, 'Fissan foot powder', 'Fissan foot powder (Unit: 50g)', 30, 325, '66.00', 18, 904, 'Over the Counter', 'FISSFFP66-U50G-FISS-MERC', 'active'),
(5935, NULL, 'Fix clay doh', 'Fix clay doh (Unit: 40g)', 30, 710, '63.00', 18, 905, 'Over the Counter', 'FIXCFCD63-U40G-FIX-MERC', 'active'),
(5936, NULL, 'Fix clay doh', 'Fix clay doh (Unit: 80g)', 30, 736, '108.00', 18, 905, 'Over the Counter', 'FIXCFCD108-U80G-FIX-MERC', 'active'),
(5937, NULL, 'Gatzby wax', 'Gatzby wax (Unit: 25g)', 30, 324, '38.00', 18, 902, 'Over the Counter', 'GATZGW38-U25G-GATZ-MERC', 'active'),
(5938, NULL, 'Green Cross Ethyl Alcohol 70%', 'Green Cross Ethyl Alcohol 70% (Unit: 500ml)', 30, 694, '94.00', 18, 901, 'Over the Counter', 'GREEGCEA794-U500ML-GREE-MERC', 'active'),
(5939, NULL, 'Green Cross Ethyl Alcohol 70%', 'Green Cross Ethyl Alcohol 70% (Unit: 75ml)', 30, 54, '54.00', 18, 901, 'Over the Counter', 'GREEGCEA754-U75ML-GREE-MERC', 'active'),
(5940, NULL, 'Green Cross Isopropyl Alcohol 70%', 'Green Cross Isopropyl Alcohol 70% (Unit: 500ml)', 30, 694, '69.00', 18, 901, 'Over the Counter', 'GREEGCIA769-U500ML-GREE-MERC', 'active'),
(5941, NULL, 'Green Cross Isopropyl Alcohol 70%', 'Green Cross Isopropyl Alcohol 70% (Unit: 250ml)', 30, 497, '92.00', 18, 901, 'Over the Counter', 'GREEGCIA792-U250ML-GREE-MERC', 'active'),
(5942, NULL, 'Green Cross Isopropyl Alcohol 70%', 'Green Cross Isopropyl Alcohol 70% (Unit: 150ml)', 30, 699, '59.00', 18, 901, 'Over the Counter', 'GREEGCIA759-U150ML-GREE-MERC', 'active'),
(5943, NULL, 'Green Cross Isopropyl Alcohol 70%', 'Green Cross Isopropyl Alcohol 70% (Unit: 60ml)', 30, 117, '48.00', 18, 901, 'Over the Counter', 'GREEGCIA748-U60ML-GREE-MERC', 'active');
INSERT INTO `tblproducts` (`productID`, `productImage`, `productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, `productCategory`, `productBrand`, `productAvailability`, `productSKU`, `productStatus`) VALUES
(5944, NULL, 'Green Cross Spray', 'Green Cross Spray (Unit: 300ml)', 30, 751, '94.00', 18, 901, 'Over the Counter', 'GREEGCS94-U300ML-GREE-MERC', 'active'),
(5945, NULL, 'Green Cross Spray', 'Green Cross Spray (Unit: 40ml)', 30, 750, '79.00', 18, 901, 'Over the Counter', 'GREEGCS79-U40ML-GREE-MERC', 'active'),
(5946, NULL, 'Hair Blacken Shampoo', 'Hair Blacken Shampoo (Unit: 1pcs)', 30, 255, '5.00', 18, 914, 'Over the Counter', 'HAIRHBS5-U1PCS-HAIR-MERC', 'active'),
(5947, NULL, 'Happee toothpaste kids', 'Happee toothpaste kids (Unit: 50ml)', 30, 276, '37.00', 18, 915, 'Over the Counter', 'HAPPHTK37-U50ML-HAPP-MERC', 'active'),
(5948, NULL, 'Happy Cotton', 'Happy Cotton (Unit: 80g)', 30, 736, '93.00', 18, 555, 'Over the Counter', 'HAPPHC93-U80G-HAPP-MERC', 'active'),
(5949, NULL, 'Happy Cotton', 'Happy Cotton (Unit: 40g)', 30, 710, '60.00', 18, 555, 'Over the Counter', 'HAPPHC60-U40G-HAPP-MERC', 'active'),
(5950, NULL, 'Happy Cotton', 'Happy Cotton (Unit: 10g)', 30, 59, '65.00', 18, 555, 'Over the Counter', 'HAPPHC65-U10G-HAPP-MERC', 'active'),
(5951, NULL, 'Happy Cotton Balls 150\'s', 'Happy Cotton Balls 150\'s (Unit: 150pcs)', 30, 754, '56.00', 18, 555, 'Over the Counter', 'HAPPHCB1S56-U150PCS-HAPP-MERC', 'active'),
(5952, NULL, 'Happy Cotton Balls 50\'s', 'Happy Cotton Balls 50\'s (Unit: 50pcs)', 30, 755, '89.00', 18, 555, 'Over the Counter', 'HAPPHCB5S89-U50PCS-HAPP-MERC', 'active'),
(5953, NULL, 'Happy Cotton buds 108\'s', 'Happy Cotton buds 108\'s (Unit: 108pcs)', 30, 756, '55.00', 18, 555, 'Over the Counter', 'HAPPHCB1S55-U108PCS-HAPP-MERC', 'active'),
(5954, NULL, 'Happy Cotton buds 200\'s', 'Happy Cotton buds 200\'s (Unit: 200pcs)', 30, 760, '50.00', 18, 555, 'Over the Counter', 'HAPPHCB2S50-U200PCS-HAPP-MERC', 'active'),
(5955, NULL, 'Happy Cotton buds 72\'s', 'Happy Cotton buds 72\'s (Unit: 72pcs)', 30, 761, '58.00', 18, 555, 'Over the Counter', 'HAPPHCB7S58-U72PCS-HAPP-MERC', 'active'),
(5956, NULL, 'High endurance deo stick', 'High endurance deo stick (Unit: 14g)', 30, 757, '94.00', 18, 924, 'Over the Counter', 'HIGHHEDS94-U14G-HIGH-MERC', 'active'),
(5957, NULL, 'Hydrogen Peroxide Aguaper', 'Hydrogen Peroxide Aguaper (Unit: 120ml)', 30, 84, '51.00', 18, 925, 'Over the Counter', 'HYDRHPA51-U120ML-HYDR-MERC', 'active'),
(5958, NULL, 'Hydrogen Peroxide Aguaper', 'Hydrogen Peroxide Aguaper (Unit: 60ml)', 30, 117, '56.00', 18, 925, 'Over the Counter', 'HYDRHPA56-U60ML-HYDR-MERC', 'active'),
(5959, NULL, 'Hydrogen Peroxide IPI', 'Hydrogen Peroxide IPI (Unit: 120ml)', 30, 84, '54.00', 18, 925, 'Over the Counter', 'HYDRHPI54-U120ML-HYDR-MERC', 'active'),
(5960, NULL, 'Hydrogen Peroxide IPI', 'Hydrogen Peroxide IPI (Unit: 60ml)', 30, 117, '89.00', 18, 925, 'Over the Counter', 'HYDRHPI89-U60ML-HYDR-MERC', 'active'),
(5961, NULL, 'Icolor Black', 'Icolor Black (Unit: 1pcs)', 30, 255, '48.00', 18, 929, 'Over the Counter', 'ICOLIB48-U1PCS-ICOL-MERC', 'active'),
(5962, NULL, 'Icolor burgandy', 'Icolor burgandy (Unit: 1pcs)', 30, 255, '60.00', 18, 929, 'Over the Counter', 'ICOLIB60-U1PCS-ICOL-MERC', 'active'),
(5963, NULL, 'Icolor chestnut brown', 'Icolor chestnut brown (Unit: 1pcs)', 30, 255, '60.00', 18, 929, 'Over the Counter', 'ICOLICB60-U1PCS-ICOL-MERC', 'active'),
(5964, NULL, 'Icolor dark brown', 'Icolor dark brown (Unit: 1pcs)', 30, 255, '60.00', 18, 929, 'Over the Counter', 'ICOLIDB60-U1PCS-ICOL-MERC', 'active'),
(5965, NULL, 'Icolor light brown', 'Icolor light brown (Unit: 1pcs)', 30, 255, '59.00', 18, 929, 'Over the Counter', 'ICOLILB59-U1PCS-ICOL-MERC', 'active'),
(5966, NULL, 'Icolor medium brown', 'Icolor medium brown (Unit: 1pcs)', 30, 255, '57.00', 18, 929, 'Over the Counter', 'ICOLIMB57-U1PCS-ICOL-MERC', 'active'),
(5967, NULL, 'iwhite bbholic', 'iwhite bbholic (Unit: 4ml)', 30, 309, '25.00', 18, 935, 'Over the Counter', 'IWHIIB25-U4ML-IWHI-MERC', 'active'),
(5968, NULL, 'iwhite Facial cream', 'iwhite Facial cream (Unit: 6ml)', 30, 773, '22.00', 18, 935, 'Over the Counter', 'IWHIIFC22-U6ML-IWHI-MERC', 'active'),
(5969, NULL, 'iwhite facial wash', 'iwhite facial wash (Unit: 10ml)', 30, 315, '20.00', 18, 935, 'Over the Counter', 'IWHIIFW20-U10ML-IWHI-MERC', 'active'),
(5970, NULL, 'iwhite Nose pack', 'iwhite Nose pack (Unit: 3.5ml)', 30, 775, '21.00', 18, 935, 'Over the Counter', 'IWHIINP21-U35ML-IWHI-MERC', 'active'),
(5971, NULL, 'iwhite Whitening pack', 'iwhite Whitening pack (Unit: 8ml)', 30, 693, '23.00', 18, 935, 'Over the Counter', 'IWHIIWP23-U8ML-IWHI-MERC', 'active'),
(5972, NULL, 'iwhite Whitening sleeping cream mask', 'iwhite Whitening sleeping cream mask (Unit: 6ml)', 30, 773, '23.00', 18, 935, 'Over the Counter', 'IWHIIWSCM23-U6ML-IWHI-MERC', 'active'),
(5973, NULL, 'Jergens lotion', 'Jergens lotion (Unit: 200ml)', 30, 778, '169.00', 18, 941, 'Over the Counter', 'JERGJL169-U200ML-JERG-MERC', 'active'),
(5974, NULL, 'Johnsons Baby oil Aloe', 'Johnsons Baby oil Aloe (Unit: 125ml)', 30, 780, '100.00', 18, 942, 'Over the Counter', 'JOHNJBOA100-U125ML-JOHN-MERC', 'active'),
(5975, NULL, 'Johnsons Baby oil Aloe', 'Johnsons Baby oil Aloe (Unit: 50ml)', 30, 276, '46.00', 18, 942, 'Over the Counter', 'JOHNJBOA46-U50ML-JOHN-MERC', 'active'),
(5976, NULL, 'Johnsons Baby oil Aloe', 'Johnsons Baby oil Aloe (Unit: 25ml)', 30, 275, '23.00', 18, 942, 'Over the Counter', 'JOHNJBOA23-U25ML-JOHN-MERC', 'active'),
(5977, NULL, 'Johnsons Baby oil Regular', 'Johnsons Baby oil Regular (Unit: 125ml)', 30, 780, '79.00', 18, 942, 'Over the Counter', 'JOHNJBOR79-U125ML-JOHN-MERC', 'active'),
(5978, NULL, 'Johnsons Baby oil Regular', 'Johnsons Baby oil Regular (Unit: 50ml)', 30, 276, '37.00', 18, 942, 'Over the Counter', 'JOHNJBOR37-U50ML-JOHN-MERC', 'active'),
(5979, NULL, 'Johnsons Baby oil Regular', 'Johnsons Baby oil Regular (Unit: 25ml)', 30, 275, '20.00', 18, 942, 'Over the Counter', 'JOHNJBOR20-U25ML-JOHN-MERC', 'active'),
(5980, NULL, 'Johnsons baby powder bedtime', 'Johnsons baby powder bedtime (Unit: 100g)', 30, 792, '46.00', 18, 942, 'Over the Counter', 'JOHNJBPB46-U100G-JOHN-MERC', 'active'),
(5981, NULL, 'Johnsons baby powder classic white', 'Johnsons baby powder classic white (Unit: 25g)', 30, 324, '10.00', 18, 942, 'Over the Counter', 'JOHNJBPCW10-U25G-JOHN-MERC', 'active'),
(5982, NULL, 'Johnsons baby powder classic white', 'Johnsons baby powder classic white (Unit: 50g)', 30, 325, '20.00', 18, 942, 'Over the Counter', 'JOHNJBPCW20-U50G-JOHN-MERC', 'active'),
(5983, NULL, 'Johnsons baby powder classic white', 'Johnsons baby powder classic white (Unit: 100g)', 30, 792, '35.00', 18, 942, 'Over the Counter', 'JOHNJBPCW35-U100G-JOHN-MERC', 'active'),
(5984, NULL, 'Johnsons baby powder cooling', 'Johnsons baby powder cooling (Unit: 50g)', 30, 325, '25.00', 18, 942, 'Over the Counter', 'JOHNJBPC25-U50G-JOHN-MERC', 'active'),
(5985, NULL, 'Johnsons baby powder cornstarch', 'Johnsons baby powder cornstarch (Unit: 200g)', 30, 785, '98.00', 18, 942, 'Over the Counter', 'JOHNJBPC98-U200G-JOHN-MERC', 'active'),
(5986, NULL, 'Johnsons baby powder milk + rice', 'Johnsons baby powder milk + rice (Unit: 25g)', 30, 324, '17.00', 18, 942, 'Over the Counter', 'JOHNJBPMR17-U25G-JOHN-MERC', 'active'),
(5987, NULL, 'Johnsons baby powder pink', 'Johnsons baby powder pink (Unit: 25g)', 30, 324, '12.00', 18, 942, 'Over the Counter', 'JOHNJBPP12-U25G-JOHN-MERC', 'active'),
(5988, NULL, 'Johnsons baby powder pink blossom', 'Johnsons baby powder pink blossom (Unit: 50g)', 30, 325, '20.00', 18, 942, 'Over the Counter', 'JOHNJBPPB20-U50G-JOHN-MERC', 'active'),
(5989, NULL, 'Johnsons baby powder pink blossom', 'Johnsons baby powder pink blossom (Unit: 200g)', 30, 785, '100.00', 18, 942, 'Over the Counter', 'JOHNJBPPB100-U200G-JOHN-MERC', 'active'),
(5990, NULL, 'Johnsons baby powder prickly heat', 'Johnsons baby powder prickly heat (Unit: 50g)', 30, 325, '23.00', 18, 942, 'Over the Counter', 'JOHNJBPPH23-U50G-JOHN-MERC', 'active'),
(5991, NULL, 'Joy Tissue flat', 'Joy Tissue flat (Unit: 1pcs)', 30, 255, '5.00', 18, 958, 'Over the Counter', 'JOYTJTF5-U1PCS-JOY-MERC', 'active'),
(5992, NULL, 'Joy Tissue roll', 'Joy Tissue roll (Unit: 1pcs)', 30, 255, '10.00', 18, 958, 'Over the Counter', 'JOYTJTR10-U1PCS-JOY-MERC', 'active'),
(5993, NULL, 'Juicy cologne', 'Juicy cologne (Unit: 50ml)', 30, 276, '26.00', 18, 961, 'Over the Counter', 'JUICJC26-U50ML-JUIC-MERC', 'active'),
(5994, NULL, 'Kami Tissue', 'Kami Tissue (Unit: 1pcs)', 30, 255, '5.00', 18, 962, 'Over the Counter', 'KAMIKT5-U1PCS-KAMI-MERC', 'active'),
(5995, NULL, 'Lactacyd All day care (pink)', 'Lactacyd All day care (pink) (Unit: 60ml)', 30, 117, '74.00', 18, 964, 'Over the Counter', 'LACTLADCP74-U60ML-LACT-MERC', 'active'),
(5996, NULL, 'Lactacyd Odor fresh (green)', 'Lactacyd Odor fresh (green) (Unit: 60ml)', 30, 117, '68.00', 18, 964, 'Over the Counter', 'LACTLOFG68-U60ML-LACT-MERC', 'active'),
(5997, NULL, 'Lactacyd Pearl intimate (blue)', 'Lactacyd Pearl intimate (blue) (Unit: 60ml)', 30, 117, '74.00', 18, 964, 'Over the Counter', 'LACTLPIB74-U60ML-LACT-MERC', 'active'),
(5998, NULL, 'Lewis and pearl cologne', 'Lewis and pearl cologne (Unit: 25ml)', 30, 275, '18.00', 18, 966, 'Over the Counter', 'LEWILAPC18-U25ML-LEWI-MERC', 'active'),
(5999, NULL, 'Lewis and pearl cologne', 'Lewis and pearl cologne (Unit: 50ml)', 30, 276, '27.00', 18, 966, 'Over the Counter', 'LEWILAPC27-U50ML-LEWI-MERC', 'active'),
(6000, NULL, 'Lewis and pearl cologne spray', 'Lewis and pearl cologne spray (Unit: 75ml)', 30, 54, '70.00', 18, 966, 'Over the Counter', 'LEWILAPCS70-U75ML-LEWI-MERC', 'active'),
(6001, NULL, 'Lewis and pearl powder rain (blue)', 'Lewis and pearl powder rain (blue) (Unit: 50g)', 30, 325, '20.00', 18, 966, 'Over the Counter', 'LEWILAPPRB20-U50G-LEWI-MERC', 'active'),
(6002, NULL, 'Lewis and pearl powder white blush (pink)', 'Lewis and pearl powder white blush (pink) (Unit: 50g)', 30, 325, '19.00', 18, 966, 'Over the Counter', 'LEWILAPPWBP19-U50G-LEWI-MERC', 'active'),
(6003, NULL, 'Listerine', 'Listerine (Unit: 100ml)', 30, 57, '60.00', 18, 971, 'Over the Counter', 'LISTL60-U100ML-LIST-MERC', 'active'),
(6004, NULL, 'Little Pals Feeding bottle', 'Little Pals Feeding bottle (Unit: 9oz)', 30, 805, '83.00', 18, 972, 'Over the Counter', 'LITTLPFB83-U9Z-LITT-MERC', 'active'),
(6005, NULL, 'Mama\'s love baby oil', 'Mama\'s love baby oil (Unit: 25ml)', 30, 275, '17.00', 18, 973, 'Over the Counter', 'MAMAMSLBO17-U25ML-MAMA-MERC', 'active'),
(6006, NULL, 'Master cleanser active brightening', 'Master cleanser active brightening (Unit: 135ml)', 30, 52, '61.00', 18, 974, 'Over the Counter', 'MASTMCAB61-U135ML-MAST-MERC', 'active'),
(6007, NULL, 'Master cleanser active brightening', 'Master cleanser active brightening (Unit: 70ml)', 30, 114, '52.00', 18, 974, 'Over the Counter', 'MASTMCAB52-U70ML-MAST-MERC', 'active'),
(6008, NULL, 'Master cleanser anti pimple', 'Master cleanser anti pimple (Unit: 135ml)', 30, 52, '75.00', 18, 974, 'Over the Counter', 'MASTMCAP75-U135ML-MAST-MERC', 'active'),
(6009, NULL, 'Master cleanser anti pimple', 'Master cleanser anti pimple (Unit: 70ml)', 30, 114, '49.00', 18, 974, 'Over the Counter', 'MASTMCAP49-U70ML-MAST-MERC', 'active'),
(6010, NULL, 'Master cleanser brightening plus', 'Master cleanser brightening plus (Unit: 135ml)', 30, 52, '74.00', 18, 974, 'Over the Counter', 'MASTMCBP74-U135ML-MAST-MERC', 'active'),
(6011, NULL, 'Master cleanser brightening plus', 'Master cleanser brightening plus (Unit: 79ml)', 30, 815, '44.00', 18, 974, 'Over the Counter', 'MASTMCBP44-U79ML-MAST-MERC', 'active'),
(6012, NULL, 'Master cleanser oil control', 'Master cleanser oil control (Unit: 135ml)', 30, 52, '75.00', 18, 974, 'Over the Counter', 'MASTMCOC75-U135ML-MAST-MERC', 'active'),
(6013, NULL, 'Master cleanser oil control', 'Master cleanser oil control (Unit: 70ml)', 30, 114, '49.00', 18, 974, 'Over the Counter', 'MASTMCOC49-U70ML-MAST-MERC', 'active'),
(6014, NULL, 'Master cool rush', 'Master cool rush (Unit: 10g)', 30, 59, '10.00', 18, 974, 'Over the Counter', 'MASTMCR10-U10G-MAST-MERC', 'active'),
(6015, NULL, 'Master F/W acne fight', 'Master F/W acne fight (Unit: 50g)', 30, 325, '94.00', 18, 974, 'Over the Counter', 'MASTMFWAF94-U50G-MAST-MERC', 'active'),
(6016, NULL, 'Master F/W anti pimple', 'Master F/W anti pimple (Unit: 50g)', 30, 325, '97.00', 18, 974, 'Over the Counter', 'MASTMFWAP97-U50G-MAST-MERC', 'active'),
(6017, NULL, 'Master F/W brigthening plus', 'Master F/W brigthening plus (Unit: 50g)', 30, 325, '96.00', 18, 974, 'Over the Counter', 'MASTMFWBP96-U50G-MAST-MERC', 'active'),
(6018, NULL, 'Master F/W cool rush', 'Master F/W cool rush (Unit: 50g)', 30, 325, '94.00', 18, 974, 'Over the Counter', 'MASTMFWCR94-U50G-MAST-MERC', 'active'),
(6019, NULL, 'Maxipeel #1', 'Maxipeel #1 (Unit: 30ml)', 30, 323, '75.00', 18, 988, 'Over the Counter', 'MAXIM175-U30ML-MAXI-MERC', 'active'),
(6020, NULL, 'Maxipeel #1', 'Maxipeel #1 (Unit: 60ml)', 30, 117, '61.00', 18, 988, 'Over the Counter', 'MAXIM161-U60ML-MAXI-MERC', 'active'),
(6021, NULL, 'Maxipeel #2', 'Maxipeel #2 (Unit: 30ml)', 30, 323, '33.00', 18, 988, 'Over the Counter', 'MAXIM233-U30ML-MAXI-MERC', 'active'),
(6022, NULL, 'Maxipeel #2', 'Maxipeel #2 (Unit: 60ml)', 30, 117, '65.00', 18, 988, 'Over the Counter', 'MAXIM265-U60ML-MAXI-MERC', 'active'),
(6023, NULL, 'Maxipeel #3', 'Maxipeel #3 (Unit: 30ml)', 30, 323, '39.00', 18, 988, 'Over the Counter', 'MAXIM339-U30ML-MAXI-MERC', 'active'),
(6024, NULL, 'Maxipeel #3', 'Maxipeel #3 (Unit: 60ml)', 30, 117, '69.00', 18, 988, 'Over the Counter', 'MAXIM369-U60ML-MAXI-MERC', 'active'),
(6025, NULL, 'Maxipeel concealing cream', 'Maxipeel concealing cream (Unit: 10g)', 30, 59, '21.00', 18, 988, 'Over the Counter', 'MAXIMCC21-U10G-MAXI-MERC', 'active'),
(6026, NULL, 'Maxipeel moisturizing cream', 'Maxipeel moisturizing cream (Unit: 8g)', 30, 350, '12.00', 18, 988, 'Over the Counter', 'MAXIMMC12-U8G-MAXI-MERC', 'active'),
(6027, NULL, 'Maxipeel sun protect', 'Maxipeel sun protect (Unit: 8g)', 30, 350, '16.00', 18, 988, 'Over the Counter', 'MAXIMSP16-U8G-MAXI-MERC', 'active'),
(6028, NULL, 'Milcu powder', 'Milcu powder (Unit: 40g)', 30, 710, '51.00', 18, 996, 'Over the Counter', 'MILCMP51-U40G-MILC-MERC', 'active'),
(6029, NULL, 'Milcu powder', 'Milcu powder (Unit: 80g)', 30, 736, '98.00', 18, 996, 'Over the Counter', 'MILCMP98-U80G-MILC-MERC', 'active'),
(6030, NULL, 'Milcu roll on', 'Milcu roll on (Unit: 50ml)', 30, 276, '78.00', 18, 996, 'Over the Counter', 'MILCMRO78-U50ML-MILC-MERC', 'active'),
(6031, NULL, 'Myra e facial moisturizer (blue)', 'Myra e facial moisturizer (blue) (Unit: 10g)', 30, 59, '7.00', 18, 732, 'Over the Counter', 'MYRAMEFMB7-U10G-MYRA-MERC', 'active'),
(6032, NULL, 'Myra e facial moisturizer (pink)', 'Myra e facial moisturizer (pink) (Unit: 10g)', 30, 59, '11.00', 18, 732, 'Over the Counter', 'MYRAMEFMP11-U10G-MYRA-MERC', 'active'),
(6033, NULL, 'Myra e lotion brightening plus', 'Myra e lotion brightening plus (Unit: 50ml)', 30, 276, '45.00', 18, 732, 'Over the Counter', 'MYRAMELBP45-U50ML-MYRA-MERC', 'active'),
(6034, NULL, 'Myra e lotion brightening plus', 'Myra e lotion brightening plus (Unit: 100ml)', 30, 57, '81.00', 18, 732, 'Over the Counter', 'MYRAMELBP81-U100ML-MYRA-MERC', 'active'),
(6035, NULL, 'Myra e lotion classic moisturizing', 'Myra e lotion classic moisturizing (Unit: 50ml)', 30, 276, '37.00', 18, 732, 'Over the Counter', 'MYRAMELCM37-U50ML-MYRA-MERC', 'active'),
(6036, NULL, 'Myra e lotion classic moisturizing', 'Myra e lotion classic moisturizing (Unit: 100ml)', 30, 57, '73.00', 18, 732, 'Over the Counter', 'MYRAMELCM73-U100ML-MYRA-MERC', 'active'),
(6037, NULL, 'Myra e lotion classic moisturizing', 'Myra e lotion classic moisturizing (Unit: 200ml)', 30, 778, '132.00', 18, 732, 'Over the Counter', 'MYRAMELCM132-U200ML-MYRA-MERC', 'active'),
(6038, NULL, 'Myra e lotion classic whitening', 'Myra e lotion classic whitening (Unit: 50ml)', 30, 276, '57.00', 18, 732, 'Over the Counter', 'MYRAMELCW57-U50ML-MYRA-MERC', 'active'),
(6039, NULL, 'Myra e lotion classic whitening', 'Myra e lotion classic whitening (Unit: 100ml)', 30, 57, '75.00', 18, 732, 'Over the Counter', 'MYRAMELCW75-U100ML-MYRA-MERC', 'active'),
(6040, NULL, 'Myra F/W fresh glow', 'Myra F/W fresh glow (Unit: 50ml)', 30, 276, '75.00', 18, 732, 'Over the Counter', 'MYRAMFWFG75-U50ML-MYRA-MERC', 'active'),
(6041, NULL, 'Nivea cool kick', 'Nivea cool kick (Unit: 25ml)', 30, 275, '69.00', 18, 1009, 'Over the Counter', 'NIVENCK69-U25ML-NIVE-MERC', 'active'),
(6042, NULL, 'Nivea cool kick', 'Nivea cool kick (Unit: 50ml)', 30, 276, '131.00', 18, 1009, 'Over the Counter', 'NIVENCK131-U50ML-NIVE-MERC', 'active'),
(6043, NULL, 'Nivea deo extra bright and firm', 'Nivea deo extra bright and firm (Unit: 50ml)', 30, 276, '124.00', 18, 1009, 'Over the Counter', 'NIVENDEBAF124-U50ML-NIVE-MERC', 'active'),
(6044, NULL, 'Nivea dry impact ', 'Nivea dry impact  (Unit: 25ml)', 30, 275, '68.00', 18, 1009, 'Over the Counter', 'NIVENDI68-U25ML-NIVE-MERC', 'active'),
(6045, NULL, 'Nivea dry impact ', 'Nivea dry impact  (Unit: 50ml)', 30, 276, '117.00', 18, 1009, 'Over the Counter', 'NIVENDI117-U50ML-NIVE-MERC', 'active'),
(6046, NULL, 'Nivea lotionwhite and repair', 'Nivea lotionwhite and repair (Unit: 50ml)', 30, 276, '74.00', 18, 1009, 'Over the Counter', 'NIVENLAR74-U50ML-NIVE-MERC', 'active'),
(6047, NULL, 'Nivea pearl ', 'Nivea pearl  (Unit: 25ml)', 30, 275, '69.00', 18, 1009, 'Over the Counter', 'NIVENP69-U25ML-NIVE-MERC', 'active'),
(6048, NULL, 'Nivea whitening', 'Nivea whitening (Unit: 25ml)', 30, 275, '71.00', 18, 1009, 'Over the Counter', 'NIVENW71-U25ML-NIVE-MERC', 'active'),
(6049, NULL, 'Nivea whitening', 'Nivea whitening (Unit: 50ml)', 30, 276, '87.00', 18, 1009, 'Over the Counter', 'NIVENW87-U50ML-NIVE-MERC', 'active'),
(6050, NULL, 'Nivea women whitening', 'Nivea women whitening (Unit: 25ml)', 30, 275, '83.00', 18, 1009, 'Over the Counter', 'NIVENWW83-U25ML-NIVE-MERC', 'active'),
(6051, NULL, 'Off Lotion kids', 'Off Lotion kids (Unit: 6ml)', 30, 773, '58.00', 18, 1019, 'Over the Counter', 'OFFLOLK58-U6ML-OFF-MERC', 'active'),
(6052, NULL, 'Off Lotion kids', 'Off Lotion kids (Unit: 50ml)', 30, 276, '63.00', 18, 1019, 'Over the Counter', 'OFFLOLK63-U50ML-OFF-MERC', 'active'),
(6053, NULL, 'Off Lotion kids', 'Off Lotion kids (Unit: 100ml)', 30, 57, '76.00', 18, 1019, 'Over the Counter', 'OFFLOLK76-U100ML-OFF-MERC', 'active'),
(6054, NULL, 'Off Lotion overtime', 'Off Lotion overtime (Unit: 6ml)', 30, 773, '88.00', 18, 1019, 'Over the Counter', 'OFFLOLO88-U6ML-OFF-MERC', 'active'),
(6055, NULL, 'Off Lotion overtime', 'Off Lotion overtime (Unit: 50ml)', 30, 276, '53.00', 18, 1019, 'Over the Counter', 'OFFLOLO53-U50ML-OFF-MERC', 'active'),
(6056, NULL, 'Off Lotion overtime', 'Off Lotion overtime (Unit: 100ml)', 30, 57, '78.00', 18, 1019, 'Over the Counter', 'OFFLOLO78-U100ML-OFF-MERC', 'active'),
(6057, NULL, 'Olay brightening cream (pink)', 'Olay brightening cream (pink) (Unit: 7.5g)', 30, 862, '9.00', 18, 1024, 'Over the Counter', 'OLAYOBCP9-U75G-OLAY-MERC', 'active'),
(6058, NULL, 'Olay brightening cream (pink) resealable', 'Olay brightening cream (pink) resealable (Unit: 7.5g)', 30, 862, '9.00', 18, 1024, 'Over the Counter', 'OLAYOBCPR9-U75G-OLAY-MERC', 'active'),
(6059, NULL, 'Olay brightening cream (yellow)', 'Olay brightening cream (yellow) (Unit: 7.5g)', 30, 862, '12.00', 18, 1024, 'Over the Counter', 'OLAYOBCY12-U75G-OLAY-MERC', 'active'),
(6060, NULL, 'Olay day cream (blue)', 'Olay day cream (blue) (Unit: 7.5g)', 30, 862, '7.00', 18, 1024, 'Over the Counter', 'OLAYODCB7-U75G-OLAY-MERC', 'active'),
(6061, NULL, 'PH care cooling comfort (blue)', 'PH care cooling comfort (blue) (Unit: 50ml)', 30, 276, '50.00', 18, 1030, 'Over the Counter', 'PHCAPCCCB50-U50ML-PH-MERC', 'active'),
(6062, NULL, 'PH care floral clean (pink)', 'PH care floral clean (pink) (Unit: 50ml)', 30, 276, '53.00', 18, 1030, 'Over the Counter', 'PHCAPCFCP53-U50ML-PH-MERC', 'active'),
(6063, NULL, 'PH care guava (green)', 'PH care guava (green) (Unit: 50ml)', 30, 276, '49.00', 18, 1030, 'Over the Counter', 'PHCAPCGG49-U50ML-PH-MERC', 'active'),
(6064, NULL, 'PH care sachet', 'PH care sachet (Unit: 5ml)', 30, 868, '5.00', 18, 1030, 'Over the Counter', 'PHCAPCS5-U5ML-PH-MERC', 'active'),
(6065, NULL, 'Ponds acne clear (blue)', 'Ponds acne clear (blue) (Unit: 10g)', 30, 59, '14.00', 18, 1036, 'Over the Counter', 'PONDPACB14-U10G-POND-MERC', 'active'),
(6066, NULL, 'Ponds bright facial foam (pink)', 'Ponds bright facial foam (pink) (Unit: 10g)', 30, 59, '11.00', 18, 1036, 'Over the Counter', 'PONDPBFFP11-U10G-POND-MERC', 'active'),
(6067, NULL, 'Ponds clear solution (green)', 'Ponds clear solution (green) (Unit: 10g)', 30, 59, '15.00', 18, 1036, 'Over the Counter', 'PONDPCSG15-U10G-POND-MERC', 'active'),
(6068, NULL, 'Ponds day cream', 'Ponds day cream (Unit: 10g)', 30, 59, '99.00', 18, 1036, 'Over the Counter', 'PONDPDC99-U10G-POND-MERC', 'active'),
(6069, NULL, 'Ponds day cream', 'Ponds day cream (Unit: 12g)', 30, 872, '21.00', 18, 1036, 'Over the Counter', 'PONDPDC21-U12G-POND-MERC', 'active'),
(6070, NULL, 'Ponds energy men ', 'Ponds energy men  (Unit: 10g)', 30, 59, '13.00', 18, 1036, 'Over the Counter', 'PONDPEM13-U10G-POND-MERC', 'active'),
(6071, NULL, 'Ponds F/W energy men', 'Ponds F/W energy men (Unit: 50g)', 30, 325, '105.00', 18, 1036, 'Over the Counter', 'PONDPFWEM105-U50G-POND-MERC', 'active'),
(6072, NULL, 'Ponds night cream', 'Ponds night cream (Unit: 10g)', 30, 59, '106.00', 18, 1036, 'Over the Counter', 'PONDPNC106-U10G-POND-MERC', 'active'),
(6073, NULL, 'Ponds pure bright (black)', 'Ponds pure bright (black) (Unit: 10g)', 30, 59, '15.00', 18, 1036, 'Over the Counter', 'PONDPPBB15-U10G-POND-MERC', 'active'),
(6074, NULL, 'Ponds toner acne clear (blue) ', 'Ponds toner acne clear (blue)  (Unit: 60ml)', 30, 117, '60.00', 18, 1036, 'Over the Counter', 'PONDPTACB60-U60ML-POND-MERC', 'active'),
(6075, NULL, 'Ponds toner bright (pink)', 'Ponds toner bright (pink) (Unit: 100ml)', 30, 57, '105.00', 18, 1036, 'Over the Counter', 'PONDPTBP105-U100ML-POND-MERC', 'active'),
(6076, NULL, 'Povidone Iodine', 'Povidone Iodine (Unit: 120ml)', 30, 84, '84.00', 18, 1049, 'Over the Counter', 'POVIPI84-U120ML-POVI-MERC', 'active'),
(6077, NULL, 'Povidone Iodine', 'Povidone Iodine (Unit: 60ml)', 30, 117, '62.00', 18, 1049, 'Over the Counter', 'POVIPI62-U60ML-POVI-MERC', 'active'),
(6078, NULL, 'Povidone Iodine', 'Povidone Iodine (Unit: 30ml)', 30, 323, '78.00', 18, 1049, 'Over the Counter', 'POVIPI78-U30ML-POVI-MERC', 'active'),
(6079, NULL, 'Povidone Iodine', 'Povidone Iodine (Unit: 15ml)', 30, 36, '83.00', 18, 1049, 'Over the Counter', 'POVIPI83-U15ML-POVI-MERC', 'active'),
(6080, NULL, 'Rdl #1', 'Rdl #1 (Unit: 30ml)', 30, 323, '32.00', 18, 1042, 'Over the Counter', 'RDL1R132-U30ML-RDL-MERC', 'active'),
(6081, NULL, 'Rdl #1', 'Rdl #1 (Unit: 60ml)', 30, 117, '56.00', 18, 1042, 'Over the Counter', 'RDL1R156-U60ML-RDL-MERC', 'active'),
(6082, NULL, 'Rdl #2', 'Rdl #2 (Unit: 30ml)', 30, 323, '61.00', 18, 1042, 'Over the Counter', 'RDL2R261-U30ML-RDL-MERC', 'active'),
(6083, NULL, 'Rdl #2', 'Rdl #2 (Unit: 60ml)', 30, 117, '87.00', 18, 1042, 'Over the Counter', 'RDL2R287-U60ML-RDL-MERC', 'active'),
(6084, NULL, 'Rdl #3', 'Rdl #3 (Unit: 30ml)', 30, 323, '89.00', 18, 1042, 'Over the Counter', 'RDL3R389-U30ML-RDL-MERC', 'active'),
(6085, NULL, 'Rdl #3', 'Rdl #3 (Unit: 60ml)', 30, 117, '87.00', 18, 1042, 'Over the Counter', 'RDL3R387-U60ML-RDL-MERC', 'active'),
(6086, NULL, 'RDL cleanser kalamansi', 'RDL cleanser kalamansi (Unit: 150ml)', 30, 699, '34.00', 18, 1042, 'Over the Counter', 'RDLCRCK34-U150ML-RDL-MERC', 'active'),
(6087, NULL, 'RDL cleanser papaya', 'RDL cleanser papaya (Unit: 75ml)', 30, 54, '23.00', 18, 1042, 'Over the Counter', 'RDLCRCP23-U75ML-RDL-MERC', 'active'),
(6088, NULL, 'RDL whitening cream', 'RDL whitening cream (Unit: 6g)', 30, 893, '22.00', 18, 1042, 'Over the Counter', 'RDLWRWC22-U6G-RDL-MERC', 'active'),
(6089, NULL, 'Rexona deo powder', 'Rexona deo powder (Unit: 25g)', 30, 324, '30.00', 18, 1056, 'Over the Counter', 'REXORDP30-U25G-REXO-MERC', 'active'),
(6090, NULL, 'Rexona deo powder dry', 'Rexona deo powder dry (Unit: 50ml)', 30, 276, '115.00', 18, 1056, 'Over the Counter', 'REXORDPD115-U50ML-REXO-MERC', 'active'),
(6091, NULL, 'Rexona deo shower clean', 'Rexona deo shower clean (Unit: 25ml)', 30, 275, '55.00', 18, 1056, 'Over the Counter', 'REXORDSC55-U25ML-REXO-MERC', 'active'),
(6092, NULL, 'Rexona ice cool', 'Rexona ice cool (Unit: 3ml)', 30, 896, '6.00', 18, 1056, 'Over the Counter', 'REXORIC6-U3ML-REXO-MERC', 'active'),
(6093, NULL, 'Rexona ice cool', 'Rexona ice cool (Unit: 25ml)', 30, 275, '54.00', 18, 1056, 'Over the Counter', 'REXORIC54-U25ML-REXO-MERC', 'active'),
(6094, NULL, 'Rexona ice cool', 'Rexona ice cool (Unit: 50ml)', 30, 276, '115.00', 18, 1056, 'Over the Counter', 'REXORIC115-U50ML-REXO-MERC', 'active'),
(6095, NULL, 'Rexona invisible dry', 'Rexona invisible dry (Unit: 25ml)', 30, 275, '61.00', 18, 1056, 'Over the Counter', 'REXORID61-U25ML-REXO-MERC', 'active'),
(6096, NULL, 'Rexona powder dry', 'Rexona powder dry (Unit: 3ml)', 30, 896, '2.00', 18, 1056, 'Over the Counter', 'REXORPD2-U3ML-REXO-MERC', 'active'),
(6097, NULL, 'Rexona quantum dry', 'Rexona quantum dry (Unit: 3ml)', 30, 896, '5.00', 18, 1056, 'Over the Counter', 'REXORQD5-U3ML-REXO-MERC', 'active'),
(6098, NULL, 'Rexona quantum dry', 'Rexona quantum dry (Unit: 25ml)', 30, 275, '55.00', 18, 1056, 'Over the Counter', 'REXORQD55-U25ML-REXO-MERC', 'active'),
(6099, NULL, 'Rexona quantum dry', 'Rexona quantum dry (Unit: 50ml)', 30, 276, '119.00', 18, 1056, 'Over the Counter', 'REXORQD119-U50ML-REXO-MERC', 'active'),
(6100, NULL, 'Rexona shower clean', 'Rexona shower clean (Unit: 3ml)', 30, 896, '6.00', 18, 1056, 'Over the Counter', 'REXORSC6-U3ML-REXO-MERC', 'active'),
(6101, NULL, 'Rexona sport defense', 'Rexona sport defense (Unit: 25ml)', 30, 275, '65.00', 18, 1056, 'Over the Counter', 'REXORSD65-U25ML-REXO-MERC', 'active'),
(6102, NULL, 'Safeguard deo stick', 'Safeguard deo stick (Unit: 14g)', 30, 757, '94.00', 18, 1070, 'Over the Counter', 'SAFESDS94-U14G-SAFE-MERC', 'active'),
(6103, NULL, 'Sanicare Cotton buds 200\'s', 'Sanicare Cotton buds 200\'s (Unit: 200pcs)', 30, 760, '45.00', 18, 1071, 'Over the Counter', 'SANISCB2S45-U200PCS-SANI-MERC', 'active'),
(6104, NULL, 'Sensodyne', 'Sensodyne (Unit: 100g)', 30, 792, '137.00', 18, 1068, 'Over the Counter', 'SENSS137-U100G-SENS-MERC', 'active'),
(6105, NULL, 'Sensodyne', 'Sensodyne (Unit: 40g)', 30, 710, '40.00', 18, 1068, 'Over the Counter', 'SENSS40-U40G-SENS-MERC', 'active'),
(6106, NULL, 'SIlka deo', 'SIlka deo (Unit: 25ml)', 30, 275, '29.00', 18, 1072, 'Over the Counter', 'SILKSD29-U25ML-SILK-MERC', 'active'),
(6107, NULL, 'Silka green papaya cleanser', 'Silka green papaya cleanser (Unit: 150ml)', 30, 699, '38.00', 18, 1072, 'Over the Counter', 'SILKSGPC38-U150ML-SILK-MERC', 'active'),
(6108, NULL, 'Silka green papaya cleanser', 'Silka green papaya cleanser (Unit: 75ml)', 30, 54, '24.00', 18, 1072, 'Over the Counter', 'SILKSGPC24-U75ML-SILK-MERC', 'active'),
(6109, NULL, 'Silka lotion green papaya', 'Silka lotion green papaya (Unit: 100ml)', 30, 57, '66.00', 18, 1072, 'Over the Counter', 'SILKSLGP66-U100ML-SILK-MERC', 'active'),
(6110, NULL, 'Silka lotion papaya', 'Silka lotion papaya (Unit: 200ml)', 30, 778, '105.00', 18, 1072, 'Over the Counter', 'SILKSLP105-U200ML-SILK-MERC', 'active'),
(6111, NULL, 'Silka papaya cleanser', 'Silka papaya cleanser (Unit: 75ml)', 30, 54, '22.00', 18, 1072, 'Over the Counter', 'SILKSPC22-U75ML-SILK-MERC', 'active'),
(6112, NULL, 'Skinwhite deo powerwhitening', 'Skinwhite deo powerwhitening (Unit: 40ml)', 30, 750, '74.00', 18, 1080, 'Over the Counter', 'SKINSDP74-U40ML-SKIN-MERC', 'active'),
(6113, NULL, 'Skinwhite facial cream beige', 'Skinwhite facial cream beige (Unit: 7g)', 30, 918, '20.00', 18, 1080, 'Over the Counter', 'SKINSFCB20-U7G-SKIN-MERC', 'active'),
(6114, NULL, 'Skinwhite lotion classic spf10', 'Skinwhite lotion classic spf10 (Unit: 100ml)', 30, 57, '73.00', 18, 1080, 'Over the Counter', 'SKINSLCS73-U100ML-SKIN-MERC', 'active'),
(6115, NULL, 'Skinwhite lotion classic spf10', 'Skinwhite lotion classic spf10 (Unit: 200ml)', 30, 778, '131.00', 18, 1080, 'Over the Counter', 'SKINSLCS131-U200ML-SKIN-MERC', 'active'),
(6116, NULL, 'Skinwhite lotion papaya', 'Skinwhite lotion papaya (Unit: 100ml)', 30, 57, '71.00', 18, 1080, 'Over the Counter', 'SKINSLP71-U100ML-SKIN-MERC', 'active'),
(6117, NULL, 'Skinwhite lotion papaya', 'Skinwhite lotion papaya (Unit: 200ml)', 30, 778, '131.00', 18, 1080, 'Over the Counter', 'SKINSLP131-U200ML-SKIN-MERC', 'active'),
(6118, NULL, 'Stylex Hair Polish', 'Stylex Hair Polish (Unit: 100ml)', 30, 57, '69.00', 18, 1086, 'Over the Counter', 'STYLSHP69-U100ML-STYL-MERC', 'active'),
(6119, NULL, 'Stylex Hair Polish ', 'Stylex Hair Polish  (Unit: 50ml)', 30, 276, '23.00', 18, 1086, 'Over the Counter', 'STYLSHP23-U50ML-STYL-MERC', 'active'),
(6120, NULL, 'Tawas powder', 'Tawas powder (Unit: 50g)', 30, 325, '11.00', 18, 1090, 'Over the Counter', 'TAWATP11-U50G-TAWA-MERC', 'active'),
(6121, NULL, 'Tender care powder classic (blue)', 'Tender care powder classic (blue) (Unit: 50g)', 30, 325, '16.00', 18, 1088, 'Over the Counter', 'TENDTCPCB16-U50G-TEND-MERC', 'active'),
(6122, NULL, 'Tender care powder classic (blue)', 'Tender care powder classic (blue) (Unit: 100g)', 30, 792, '29.00', 18, 1088, 'Over the Counter', 'TENDTCPCB29-U100G-TEND-MERC', 'active'),
(6123, NULL, 'Tender love wipes 80\'s', 'Tender love wipes 80\'s (Unit: 80pcs)', 30, 926, '41.00', 18, 1088, 'Over the Counter', 'TENDTLW8S41-U80PCS-TEND-MERC', 'active'),
(6124, NULL, 'Vaseline lotion fresh and bright cooling', 'Vaseline lotion fresh and bright cooling (Unit: 100ml)', 30, 57, '111.00', 18, 1093, 'Over the Counter', 'VASEVLFABC111-U100ML-VASE-MERC', 'active'),
(6125, NULL, 'Vaseline Petroleum Jelly', 'Vaseline Petroleum Jelly (Unit: 100ml)', 30, 57, '118.00', 18, 1093, 'Over the Counter', 'VASEVPJ118-U100ML-VASE-MERC', 'active'),
(6126, NULL, 'Vaseline Petroleum Jelly ', 'Vaseline Petroleum Jelly  (Unit: 50ml)', 30, 276, '62.00', 18, 1093, 'Over the Counter', 'VASEVPJ62-U50ML-VASE-MERC', 'active'),
(6127, NULL, 'Vitress cuticle coat', 'Vitress cuticle coat (Unit: 15ml)', 30, 36, '36.00', 18, 1092, 'Over the Counter', 'VITRVCC36-U15ML-VITR-MERC', 'active'),
(6128, NULL, 'Vitress Hair polish', 'Vitress Hair polish (Unit: 50ml)', 30, 276, '44.00', 18, 1092, 'Over the Counter', 'VITRVHP44-U50ML-VITR-MERC', 'active'),
(6996, NULL, 'Youngs cologne', 'Youngs cologne (Unit: 50ml)', 30, 276, '28.00', 18, 1097, 'Over the Counter', 'YOUNYC28-U50ML-YOUN-MERC', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tblpurchaseitems`
--

CREATE TABLE `tblpurchaseitems` (
  `pItemID` bigint(30) NOT NULL,
  `pItemQuantity` int(30) NOT NULL,
  `productID` bigint(30) NOT NULL,
  `pNetPrice` decimal(10,2) NOT NULL,
  `pAmount` decimal(10,2) NOT NULL,
  `parentPO_ID` varchar(300) NOT NULL,
  `pStatus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblpurchaseitems`
--

INSERT INTO `tblpurchaseitems` (`pItemID`, `pItemQuantity`, `productID`, `pNetPrice`, `pAmount`, `parentPO_ID`, `pStatus`) VALUES
(123, 23, 5473, '575.00', '575.00', 'PO_648040', 'completed'),
(124, 13, 5473, '325.00', '325.00', 'PO_648040', 'back order'),
(132, 23, 5474, '1058.00', '1058.00', 'PO_153202', 'completed'),
(133, 23, 5473, '575.00', '575.00', 'PO_931675', 'completed'),
(134, 20, 5274, '280.00', '280.00', 'PO_820551', 'completed'),
(135, 23, 5473, '575.00', '575.00', 'PO_085283', 'completed'),
(136, 23, 5903, '874.00', '874.00', 'PO_372241', 'completed'),
(137, 20, 5477, '900.00', '900.00', 'PO_618007', 'completed'),
(138, 100, 6996, '2800.00', '2800.00', 'PO_942712', 'completed'),
(141, 50, 5679, '1150.00', '1150.00', 'PO_857364', 'completed'),
(142, 30, 5677, '1380.00', '1380.00', 'PO_857364', 'completed'),
(143, 100, 5774, '400.00', '400.00', 'PO_857364', 'completed'),
(144, 100, 5651, '400.00', '400.00', 'PO_653079', 'completed'),
(145, 100, 5267, '1500.00', '1500.00', 'PO_653079', 'completed'),
(146, 100, 5639, '14200.00', '14200.00', 'PO_653079', 'completed'),
(147, 100, 5584, '3500.00', '3500.00', 'PO_653079', 'completed'),
(148, 100, 5454, '400.00', '400.00', 'PO_653079', 'completed'),
(149, 100, 5867, '9600.00', '9600.00', 'PO_653079', 'completed'),
(150, 100, 5470, '900.00', '900.00', 'PO_653079', 'completed'),
(151, 100, 5561, '700.00', '700.00', 'PO_653079', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `tblpurchaseorder`
--

CREATE TABLE `tblpurchaseorder` (
  `purchaseID` bigint(30) NOT NULL,
  `PONumber` varchar(300) NOT NULL,
  `Supplier` bigint(30) NOT NULL,
  `PODelDate` date NOT NULL,
  `PORemarks` varchar(500) DEFAULT NULL,
  `PODateCreated` datetime NOT NULL,
  `POStatus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblpurchaseorder`
--

INSERT INTO `tblpurchaseorder` (`purchaseID`, `PONumber`, `Supplier`, `PODelDate`, `PORemarks`, `PODateCreated`, `POStatus`) VALUES
(37, 'PO_648040', 3, '2022-11-16', '', '2022-11-11 12:02:59', 'completed'),
(38, 'PO_153202', 3, '2022-11-19', '', '2022-11-19 00:00:00', 'completed'),
(39, 'PO_931675', 3, '2022-11-21', '', '2022-11-21 00:00:00', 'completed'),
(40, 'PO_820551', 2, '2022-11-24', '', '2022-11-21 00:00:00', 'completed'),
(41, 'PO_085283', 3, '2022-11-21', '', '2022-11-21 00:00:00', 'completed'),
(42, 'PO_372241', 3, '2022-11-29', '', '2022-11-21 00:00:00', 'completed'),
(43, 'PO_618007', 3, '2022-11-29', '', '2022-11-25 00:00:00', 'completed'),
(44, 'PO_942712', 8, '2023-11-30', '', '2022-11-25 00:00:00', 'completed'),
(45, 'PO_438396', 3, '2022-11-25', '', '2022-11-25 00:00:00', 'completed'),
(47, 'PO_857364', 9, '2022-11-29', '', '2022-11-26 00:00:00', 'completed'),
(48, 'PO_653079', 6, '2022-12-02', '', '2022-12-02 00:00:00', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `tblreports`
--

CREATE TABLE `tblreports` (
  `salesID` bigint(30) NOT NULL,
  `productID` bigint(30) NOT NULL,
  `totalSold` int(30) NOT NULL,
  `totalSales` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblsupplier`
--

CREATE TABLE `tblsupplier` (
  `SupplierID` bigint(30) NOT NULL,
  `Supplier_ComName` varchar(300) NOT NULL,
  `Supplier_RepName` varchar(300) NOT NULL,
  `Supplier_ContNum` varchar(300) NOT NULL,
  `Supplier_Address` varchar(300) NOT NULL,
  `SuppStatus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblsupplier`
--

INSERT INTO `tblsupplier` (`SupplierID`, `Supplier_ComName`, `Supplier_RepName`, `Supplier_ContNum`, `Supplier_Address`, `SuppStatus`) VALUES
(2, 'ALLPS PHARMACY', 'Unknown', '09209032884', 'SAMPALOC, MANILA', 'active'),
(3, 'MJK', 'LEA', '09176261888', 'BANAWE, QC', 'active'),
(4, 'OHANA TRADING', 'MARCIAL LAGRONO', '(Via Messenger)', 'LAS PINAS CITY', 'active'),
(6, 'RBC-MDC', 'EDGAR', '09178244893', 'MUNTINLUPA QC', 'active'),
(7, 'VITALIZE', 'Unknown', '(Via App)', 'KAINGIN QC', 'active'),
(8, 'JR&R', 'ROMEO YAMBA', '(Via Messenger)', 'QUIRINO, QC', 'active'),
(9, 'EBA GENERIC', 'JARED', '09759005613', 'KAMIAS, QC', 'active'),
(10, 'MAC TYCOON', 'Unknown', '(Walk-In)', 'BAMBANG, MANILA', 'active'),
(11, 'IPI INC', 'Unknown', '5054822', 'ANGONO, RIZAL', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tbltax`
--

CREATE TABLE `tbltax` (
  `TaxID` bigint(30) NOT NULL,
  `Tax_Name` varchar(300) NOT NULL,
  `Tax_Value` int(30) NOT NULL,
  `Status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbltax`
--

INSERT INTO `tbltax` (`TaxID`, `Tax_Name`, `Tax_Value`, `Status`) VALUES
(1, 'VAT', 12, 'active'),
(2, 'Additional Tax', 5, 'active');

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
(1, 'Admin1', '$2a$10$7qMJM.TyQSAGzuUTVV/0QOGbgFtUiXWvDKOqyz5uCdvBEThgCuBSW', 0, 'Admin', '0', '1', 'active'),
(7, 'employeetest', '$2a$10$0rtWgqsSM3aHnJGo4EI8GuBKGceur4T.3Nq7HbtxKclaYT6ilSmAm', 2, 'test employee', '123 asdasdasdasdas', '09123123123', 'active');

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
-- Dumping data for table `user_sessions`
--

INSERT INTO `user_sessions` (`session_id`, `expires`, `data`) VALUES
('1_ZlqigIakwcRNS5fIYarKFqU5batFJH', 1669437287, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T14:18:32.292Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0}}'),
('34e_rIe261te1gNNTsh34B35HKrNN66b', 1669434104, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-26T03:23:06.277Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}'),
('7mKCklVXFA0AQEpsdh_RNsEy_A6nBahL', 1669395947, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T17:05:32.752Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0}}'),
('F-epgo5fO3uzRc9W-51yoLo-SX98_1xd', 1669394941, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T16:26:58.294Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0}}'),
('P3U0ULScwnqBnCGoec-CqNC-vhuNEux2', 1669397210, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T17:26:50.105Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}'),
('SkudiUgzZ2mHorkgwINQmYf6XOYlBpf9', 1669437658, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-26T04:35:04.210Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}'),
('TdgWSgwDPVhhnGLQ37OqcFbCsGFphsrJ', 1669399566, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T18:06:05.984Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}'),
('UoccroSHk31OonrJUJ4Ln9GpE7tgIoOq', 1669401314, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T18:35:13.814Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}'),
('UtjaqWhalJCbQB2vo7dl87eP2A1fGkjQ', 1669397333, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T17:28:52.686Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}'),
('dpTW-tCFVoRlPjN236ieuXTqL2QlKSuv', 1669467403, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T17:38:15.053Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}'),
('j3z9W8b4l_jftqggwCo0nJ5SEaC-NJ_9', 1669400099, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T18:14:58.765Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}'),
('kkcfZuQ9yCn1SZLnTdGpYsh9rJZfgXUC', 1669399434, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-25T18:03:54.312Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}'),
('qonANtVFmpoNwJPJwz32Jge-66hwyau5', 1669422371, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-11-26T00:23:32.847Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"user\":{\"id\":1,\"username\":\"Admin1\",\"userRoleID\":0,\"userStatus\":\"active\"}}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `tblapinvoice`
--
ALTER TABLE `tblapinvoice`
  ADD PRIMARY KEY (`invoiceID`),
  ADD UNIQUE KEY `invoiceNumber` (`invoiceNumber`),
  ADD KEY `goodsreceiptConnection` (`GRNumber`);

--
-- Indexes for table `tblattributes`
--
ALTER TABLE `tblattributes`
  ADD PRIMARY KEY (`Attr_ID`),
  ADD UNIQUE KEY `Attribute_Name` (`Attribute_Name`);

--
-- Indexes for table `tblattributesvalue`
--
ALTER TABLE `tblattributesvalue`
  ADD PRIMARY KEY (`Value_ID`),
  ADD UNIQUE KEY `Value_Name` (`Value_Name`),
  ADD KEY `ondelete` (`Attr_Parent_ID`);

--
-- Indexes for table `tblauditlog`
--
ALTER TABLE `tblauditlog`
  ADD PRIMARY KEY (`AuditID`);

--
-- Indexes for table `tblbrand`
--
ALTER TABLE `tblbrand`
  ADD PRIMARY KEY (`BrandID`),
  ADD UNIQUE KEY `Brand_Name` (`Brand_Name`);

--
-- Indexes for table `tblcart`
--
ALTER TABLE `tblcart`
  ADD PRIMARY KEY (`CartID`),
  ADD KEY `customerCart` (`CustomerID`);

--
-- Indexes for table `tblcartitems`
--
ALTER TABLE `tblcartitems`
  ADD PRIMARY KEY (`CartItemID`),
  ADD UNIQUE KEY `prevent duplicate` (`ParentCartID`,`InventoryID`),
  ADD KEY `cartItemRelation` (`InventoryID`);

--
-- Indexes for table `tblcategory`
--
ALTER TABLE `tblcategory`
  ADD PRIMARY KEY (`CategoryID`),
  ADD UNIQUE KEY `Category_Name` (`Category_Name`);

--
-- Indexes for table `tblcompanyprofile`
--
ALTER TABLE `tblcompanyprofile`
  ADD PRIMARY KEY (`companyID`);

--
-- Indexes for table `tblcustomer`
--
ALTER TABLE `tblcustomer`
  ADD PRIMARY KEY (`CustID`),
  ADD UNIQUE KEY `CustCode` (`CustCode`);

--
-- Indexes for table `tblcustomerpoints`
--
ALTER TABLE `tblcustomerpoints`
  ADD PRIMARY KEY (`PntCustID`),
  ADD UNIQUE KEY `CustCode_UNIQUE` (`CustCode`);

--
-- Indexes for table `tbldiscount`
--
ALTER TABLE `tbldiscount`
  ADD PRIMARY KEY (`DiscountID`);

--
-- Indexes for table `tblfaqs`
--
ALTER TABLE `tblfaqs`
  ADD PRIMARY KEY (`faqID`);

--
-- Indexes for table `tblgoodsitems`
--
ALTER TABLE `tblgoodsitems`
  ADD PRIMARY KEY (`gItemID`),
  ADD KEY `goodsReceipt` (`parentGR_ID`),
  ADD KEY `goodsProduct` (`productID`);

--
-- Indexes for table `tblgoodsreceiptpo`
--
ALTER TABLE `tblgoodsreceiptpo`
  ADD PRIMARY KEY (`goodsID`),
  ADD UNIQUE KEY `GRNumber` (`GRNumber`),
  ADD KEY `POConnection` (`PONumber`);

--
-- Indexes for table `tblinventory`
--
ALTER TABLE `tblinventory`
  ADD PRIMARY KEY (`inventoryID`),
  ADD UNIQUE KEY `inventoryPreventDuplicate` (`productID`,`inventorySalesPrice`,`inventoryDateExp`),
  ADD KEY `inventorySupplier` (`Supplier`);

--
-- Indexes for table `tblorderitems`
--
ALTER TABLE `tblorderitems`
  ADD PRIMARY KEY (`itemOrderID`),
  ADD KEY `handleProductItem` (`productID`),
  ADD KEY `handleRefNumber` (`ReferenceNumber`),
  ADD KEY `inventoryFK` (`inventoryID`);

--
-- Indexes for table `tblorders`
--
ALTER TABLE `tblorders`
  ADD PRIMARY KEY (`OrderID`),
  ADD UNIQUE KEY `ReferenceNumber` (`ReferenceNumber`),
  ADD KEY `customerCode` (`CustomerCode`);

--
-- Indexes for table `tblpayment`
--
ALTER TABLE `tblpayment`
  ADD PRIMARY KEY (`paymentID`),
  ADD KEY `custCode` (`CustomerCode`),
  ADD KEY `refNum` (`ReferenceNumber`);

--
-- Indexes for table `tblproducts`
--
ALTER TABLE `tblproducts`
  ADD PRIMARY KEY (`productID`),
  ADD UNIQUE KEY `productSKU` (`productSKU`),
  ADD KEY `ProdCategory` (`productCategory`),
  ADD KEY `ProdBrand` (`productBrand`),
  ADD KEY `ProdAttribute` (`productAttribute`),
  ADD KEY `ProdAttrValue` (`productAttrValue`);

--
-- Indexes for table `tblpurchaseitems`
--
ALTER TABLE `tblpurchaseitems`
  ADD PRIMARY KEY (`pItemID`),
  ADD UNIQUE KEY `preventDuplicate` (`productID`,`parentPO_ID`,`pStatus`) USING BTREE,
  ADD KEY `purchaseOrder` (`parentPO_ID`);

--
-- Indexes for table `tblpurchaseorder`
--
ALTER TABLE `tblpurchaseorder`
  ADD PRIMARY KEY (`purchaseID`),
  ADD UNIQUE KEY `po_number` (`PONumber`),
  ADD KEY `poSupplier` (`Supplier`);

--
-- Indexes for table `tblreports`
--
ALTER TABLE `tblreports`
  ADD PRIMARY KEY (`salesID`),
  ADD KEY `salesProduct` (`productID`);

--
-- Indexes for table `tblsupplier`
--
ALTER TABLE `tblsupplier`
  ADD PRIMARY KEY (`SupplierID`),
  ADD UNIQUE KEY `Supplier_ComName` (`Supplier_ComName`);

--
-- Indexes for table `tbltax`
--
ALTER TABLE `tbltax`
  ADD PRIMARY KEY (`TaxID`);

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
-- AUTO_INCREMENT for table `tblapinvoice`
--
ALTER TABLE `tblapinvoice`
  MODIFY `invoiceID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblattributes`
--
ALTER TABLE `tblattributes`
  MODIFY `Attr_ID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `tblattributesvalue`
--
ALTER TABLE `tblattributesvalue`
  MODIFY `Value_ID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=984;

--
-- AUTO_INCREMENT for table `tblauditlog`
--
ALTER TABLE `tblauditlog`
  MODIFY `AuditID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2488;

--
-- AUTO_INCREMENT for table `tblbrand`
--
ALTER TABLE `tblbrand`
  MODIFY `BrandID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1155;

--
-- AUTO_INCREMENT for table `tblcart`
--
ALTER TABLE `tblcart`
  MODIFY `CartID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tblcartitems`
--
ALTER TABLE `tblcartitems`
  MODIFY `CartItemID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `tblcategory`
--
ALTER TABLE `tblcategory`
  MODIFY `CategoryID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8359;

--
-- AUTO_INCREMENT for table `tblcompanyprofile`
--
ALTER TABLE `tblcompanyprofile`
  MODIFY `companyID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblcustomer`
--
ALTER TABLE `tblcustomer`
  MODIFY `CustID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tblcustomerpoints`
--
ALTER TABLE `tblcustomerpoints`
  MODIFY `PntCustID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbldiscount`
--
ALTER TABLE `tbldiscount`
  MODIFY `DiscountID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tblfaqs`
--
ALTER TABLE `tblfaqs`
  MODIFY `faqID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblgoodsitems`
--
ALTER TABLE `tblgoodsitems`
  MODIFY `gItemID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `tblgoodsreceiptpo`
--
ALTER TABLE `tblgoodsreceiptpo`
  MODIFY `goodsID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `tblinventory`
--
ALTER TABLE `tblinventory`
  MODIFY `inventoryID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `tblorderitems`
--
ALTER TABLE `tblorderitems`
  MODIFY `itemOrderID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=512;

--
-- AUTO_INCREMENT for table `tblorders`
--
ALTER TABLE `tblorders`
  MODIFY `OrderID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT for table `tblpayment`
--
ALTER TABLE `tblpayment`
  MODIFY `paymentID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `tblproducts`
--
ALTER TABLE `tblproducts`
  MODIFY `productID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7060;

--
-- AUTO_INCREMENT for table `tblpurchaseitems`
--
ALTER TABLE `tblpurchaseitems`
  MODIFY `pItemID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `tblpurchaseorder`
--
ALTER TABLE `tblpurchaseorder`
  MODIFY `purchaseID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `tblreports`
--
ALTER TABLE `tblreports`
  MODIFY `salesID` bigint(30) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblsupplier`
--
ALTER TABLE `tblsupplier`
  MODIFY `SupplierID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbltax`
--
ALTER TABLE `tbltax`
  MODIFY `TaxID` bigint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Constraints for table `tblapinvoice`
--
ALTER TABLE `tblapinvoice`
  ADD CONSTRAINT `goodsreceiptConnection` FOREIGN KEY (`GRNumber`) REFERENCES `tblgoodsreceiptpo` (`GRNumber`) ON UPDATE CASCADE;

--
-- Constraints for table `tblattributesvalue`
--
ALTER TABLE `tblattributesvalue`
  ADD CONSTRAINT `ondelete` FOREIGN KEY (`Attr_Parent_ID`) REFERENCES `tblattributes` (`Attr_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblcart`
--
ALTER TABLE `tblcart`
  ADD CONSTRAINT `customerCart` FOREIGN KEY (`CustomerID`) REFERENCES `tblcustomer` (`CustCode`) ON UPDATE CASCADE;

--
-- Constraints for table `tblcartitems`
--
ALTER TABLE `tblcartitems`
  ADD CONSTRAINT `cartItemRelation` FOREIGN KEY (`InventoryID`) REFERENCES `tblinventory` (`inventoryID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `parentCart` FOREIGN KEY (`ParentCartID`) REFERENCES `tblcart` (`CartID`) ON UPDATE CASCADE;

--
-- Constraints for table `tblcustomerpoints`
--
ALTER TABLE `tblcustomerpoints`
  ADD CONSTRAINT `CustCodeFK` FOREIGN KEY (`CustCode`) REFERENCES `tblcustomer` (`CustCode`) ON UPDATE CASCADE;

--
-- Constraints for table `tblgoodsitems`
--
ALTER TABLE `tblgoodsitems`
  ADD CONSTRAINT `goodsProduct` FOREIGN KEY (`productID`) REFERENCES `tblproducts` (`productID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `goodsReceipt` FOREIGN KEY (`parentGR_ID`) REFERENCES `tblgoodsreceiptpo` (`GRNumber`) ON UPDATE CASCADE;

--
-- Constraints for table `tblgoodsreceiptpo`
--
ALTER TABLE `tblgoodsreceiptpo`
  ADD CONSTRAINT `POConnection` FOREIGN KEY (`PONumber`) REFERENCES `tblpurchaseorder` (`PONumber`) ON UPDATE CASCADE;

--
-- Constraints for table `tblinventory`
--
ALTER TABLE `tblinventory`
  ADD CONSTRAINT `InventoryProductID` FOREIGN KEY (`productID`) REFERENCES `tblproducts` (`productID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `inventorySupplier` FOREIGN KEY (`Supplier`) REFERENCES `tblsupplier` (`SupplierID`) ON UPDATE CASCADE;

--
-- Constraints for table `tblorderitems`
--
ALTER TABLE `tblorderitems`
  ADD CONSTRAINT `handleProductItem` FOREIGN KEY (`productID`) REFERENCES `tblproducts` (`productID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `handleRefNumber` FOREIGN KEY (`ReferenceNumber`) REFERENCES `tblorders` (`ReferenceNumber`) ON UPDATE CASCADE,
  ADD CONSTRAINT `inventoryFK` FOREIGN KEY (`inventoryID`) REFERENCES `tblinventory` (`inventoryID`) ON UPDATE CASCADE;

--
-- Constraints for table `tblorders`
--
ALTER TABLE `tblorders`
  ADD CONSTRAINT `customerCode` FOREIGN KEY (`CustomerCode`) REFERENCES `tblcustomer` (`CustCode`) ON UPDATE CASCADE;

--
-- Constraints for table `tblpayment`
--
ALTER TABLE `tblpayment`
  ADD CONSTRAINT `custCode` FOREIGN KEY (`CustomerCode`) REFERENCES `tblcustomer` (`CustCode`) ON UPDATE CASCADE,
  ADD CONSTRAINT `refNum` FOREIGN KEY (`ReferenceNumber`) REFERENCES `tblorders` (`ReferenceNumber`) ON UPDATE CASCADE;

--
-- Constraints for table `tblproducts`
--
ALTER TABLE `tblproducts`
  ADD CONSTRAINT `ProdAttrValue` FOREIGN KEY (`productAttrValue`) REFERENCES `tblattributesvalue` (`Value_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ProdAttribute` FOREIGN KEY (`productAttribute`) REFERENCES `tblattributes` (`Attr_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ProdBrand` FOREIGN KEY (`productBrand`) REFERENCES `tblbrand` (`BrandID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ProdCategory` FOREIGN KEY (`productCategory`) REFERENCES `tblcategory` (`CategoryID`) ON UPDATE CASCADE;

--
-- Constraints for table `tblpurchaseitems`
--
ALTER TABLE `tblpurchaseitems`
  ADD CONSTRAINT `purchaseItem` FOREIGN KEY (`productID`) REFERENCES `tblproducts` (`productID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `purchaseOrder` FOREIGN KEY (`parentPO_ID`) REFERENCES `tblpurchaseorder` (`PONumber`) ON UPDATE CASCADE;

--
-- Constraints for table `tblpurchaseorder`
--
ALTER TABLE `tblpurchaseorder`
  ADD CONSTRAINT `poSupplier` FOREIGN KEY (`Supplier`) REFERENCES `tblsupplier` (`SupplierID`) ON UPDATE CASCADE;

--
-- Constraints for table `tblreports`
--
ALTER TABLE `tblreports`
  ADD CONSTRAINT `salesProduct` FOREIGN KEY (`productID`) REFERENCES `tblproducts` (`productID`) ON UPDATE CASCADE;

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
