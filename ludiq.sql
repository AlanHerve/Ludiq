-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 27, 2023 at 02:29 PM
-- Server version: 5.7.11
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ludiq`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `ID_ACTIVITY` int(11) NOT NULL,
  `ID_ACTIVITY_DIRECTOR` int(11) NOT NULL,
  `ID_HOBBY` int(11) NOT NULL,
  `ADVANCEMENT` varchar(30) DEFAULT 'Beginner',
  `DESCRIPTION` text,
  `DATE_POST` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `DATE_ACTIVITY` date DEFAULT NULL,
  `CURRENT_REGISTERED` int(4) DEFAULT '1',
  `MAX_REGISTRATIONS` int(4) NOT NULL DEFAULT '10'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`ID_ACTIVITY`, `ID_ACTIVITY_DIRECTOR`, `ID_HOBBY`, `ADVANCEMENT`, `DESCRIPTION`, `DATE_POST`, `DATE_ACTIVITY`, `CURRENT_REGISTERED`, `MAX_REGISTRATIONS`) VALUES
(1, 2, 1, 'Beginner', NULL, '2023-05-27 14:27:54', NULL, 1, 10),
(2, 2, 1, 'Beginner', NULL, '2023-05-27 14:27:54', NULL, 1, 10),
(3, 2, 4, 'Beginner', NULL, '2023-05-27 14:28:21', NULL, 1, 10),
(4, 2, 3, 'Beginner', NULL, '2023-05-27 14:28:21', NULL, 1, 10),
(5, 2, 4, 'Beginner', NULL, '2023-05-27 14:28:21', NULL, 1, 10),
(6, 3, 5, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10),
(7, 3, 7, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10),
(8, 3, 9, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10),
(9, 3, 8, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10),
(10, 3, 1, 'Beginner', NULL, '2023-05-27 14:29:09', NULL, 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `activity_director`
--

CREATE TABLE `activity_director` (
  `ID_USER` int(11) NOT NULL,
  `ID_ORGANIZATION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity_director`
--

INSERT INTO `activity_director` (`ID_USER`, `ID_ORGANIZATION`) VALUES
(3, 1),
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `ID_COMMENT` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `CONTENT` text,
  `ID_REGULAR_POST` int(11) NOT NULL,
  `TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `ID_USER` int(11) NOT NULL,
  `ID_USER_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`ID_USER`, `ID_USER_2`) VALUES
(2, 3),
(4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `hobby`
--

CREATE TABLE `hobby` (
  `ID_HOBBY` int(11) NOT NULL,
  `HOBBY_NAME` varchar(30) NOT NULL,
  `IMAGE` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hobby`
--

INSERT INTO `hobby` (`ID_HOBBY`, `HOBBY_NAME`, `IMAGE`) VALUES
(1, 'Pottery', 'Pottery.jpg'),
(2, 'Crochet', 'Crochet.jpg'),
(3, 'Drawing', 'Drawing.PNG'),
(4, 'Guitar', 'Guitar.png'),
(5, 'Hiking', 'Hiking.png'),
(6, 'Soccer', 'Football2.PNG'),
(7, 'Cooking', 'Cooking.jpg'),
(8, 'Sculpture', 'Sculpture.jpg'),
(9, 'Board Games', 'Jeux.jpg'),
(10, 'Photo', 'Photo.jpg'),
(11, 'Painting', 'Painting.jpg'),
(12, 'Biking', 'Biking.jpg'),
(13, 'Video Games', 'videogame.jpg'),
(14, 'Climbing', 'Climbing.jpg'),
(15, 'Geocache', 'Geocache.jpg'),
(16, 'Sowing', 'Sowing.PNG'),
(17, 'Embroidery', 'Embroidery.jpg'),
(18, 'Scrapbooking', 'Scrapbooking.jpg'),
(19, 'Reading', 'Reading.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `hobby_post`
--

CREATE TABLE `hobby_post` (
  `ID_HOBBY_POST` int(11) NOT NULL,
  `ID_HOBBY` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `EXPERIENCE` varchar(30) DEFAULT 'Beginner',
  `FREQUENCY` varchar(30) DEFAULT NULL,
  `AVAILABLE` tinyint(1) DEFAULT '0',
  `IMAGE` varchar(60) DEFAULT NULL,
  `DESCRIPTION` text,
  `MODIFIED` int(1) DEFAULT '0',
  `TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `ID_MESSAGE` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_USER_2` int(11) NOT NULL,
  `CONTENT` text,
  `TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `ID_ORGANIZATION` int(11) NOT NULL,
  `NAME_ORGANIZATION` varchar(64) NOT NULL,
  `AVATAR` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`ID_ORGANIZATION`, `NAME_ORGANIZATION`, `AVATAR`) VALUES
(1, 'Indépendant', NULL),
(2, 'AE', NULL),
(3, 'Troll Penché', NULL),
(4, 'Cook\'UT', NULL),
(5, 'Arrêt Dessin', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `regular_post`
--

CREATE TABLE `regular_post` (
  `ID_REGULAR_POST` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_HOBBY` int(11) NOT NULL,
  `DESCRIPTION` text,
  `IMAGE1` varchar(60) DEFAULT NULL,
  `IMAGE2` varchar(60) DEFAULT NULL,
  `IMAGE3` varchar(60) DEFAULT NULL,
  `IMAGE4` varchar(60) DEFAULT NULL,
  `MODIFIED` int(1) DEFAULT '0',
  `LIKES` int(11) DEFAULT '0',
  `TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID_USER` int(11) NOT NULL,
  `USER_NAME` varchar(20) NOT NULL,
  `USER_PSEUDO` varchar(20) NOT NULL,
  `USER_PASSWORD` varchar(500) NOT NULL,
  `EMAIL` varchar(60) NOT NULL,
  `AVATAR` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID_USER`, `USER_NAME`, `USER_PSEUDO`, `USER_PASSWORD`, `EMAIL`, `AVATAR`) VALUES
(2, 'Alan', 'Alan', '$2y$10$mTVn.8PWcUhvUEMmethDxehWaTfDMVEO5haxH8QNf0jcUcN1q2jZW', 'alan@gmail.com', NULL),
(3, 'Tegg', 'Tegg', '$2y$10$bQtqW3WS/LLj12H6AYha3uvW1z8xYRTWWElmQq88zFJq6DGuCvXua', 'Tegg@gmail.com', NULL),
(4, 'Sand', 'Sand', '$2y$10$9yzrcEouJzVE1FQidXVVjuRMwriCsqKJ3J3MEFNndKTz5fnGiKWOW', 'Sand@gmail.com', NULL),
(5, 'Tact', 'Tact', '$2y$10$BzPR88BwQBMYKYnA04.NsOFWAmettI9.7t.SLzN01LQKLO4C8kzBa', 'tact@gmail.com', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`ID_ACTIVITY`),
  ADD KEY `ID_ACTIVITY_DIRECTOR` (`ID_ACTIVITY_DIRECTOR`),
  ADD KEY `ID_HOBBY` (`ID_HOBBY`);

--
-- Indexes for table `activity_director`
--
ALTER TABLE `activity_director`
  ADD PRIMARY KEY (`ID_USER`,`ID_ORGANIZATION`),
  ADD KEY `ID_ORGANIZATION` (`ID_ORGANIZATION`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID_COMMENT`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_REGULAR_POST` (`ID_REGULAR_POST`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_USER_2` (`ID_USER_2`);

--
-- Indexes for table `hobby`
--
ALTER TABLE `hobby`
  ADD PRIMARY KEY (`ID_HOBBY`);

--
-- Indexes for table `hobby_post`
--
ALTER TABLE `hobby_post`
  ADD PRIMARY KEY (`ID_HOBBY_POST`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_HOBBY` (`ID_HOBBY`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`ID_MESSAGE`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_USER_2` (`ID_USER_2`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`ID_ORGANIZATION`);

--
-- Indexes for table `regular_post`
--
ALTER TABLE `regular_post`
  ADD PRIMARY KEY (`ID_REGULAR_POST`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_HOBBY` (`ID_HOBBY`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID_USER`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `ID_ACTIVITY` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `hobby`
--
ALTER TABLE `hobby`
  MODIFY `ID_HOBBY` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `ID_MESSAGE` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `ID_ORGANIZATION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `regular_post`
--
ALTER TABLE `regular_post`
  MODIFY `ID_REGULAR_POST` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID_USER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`ID_ACTIVITY_DIRECTOR`) REFERENCES `activity_director` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`ID_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`) ON DELETE CASCADE;

--
-- Constraints for table `activity_director`
--
ALTER TABLE `activity_director`
  ADD CONSTRAINT `activity_director_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `activity_director_ibfk_2` FOREIGN KEY (`ID_ORGANIZATION`) REFERENCES `organization` (`ID_ORGANIZATION`) ON DELETE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`ID_REGULAR_POST`) REFERENCES `regular_post` (`ID_REGULAR_POST`) ON DELETE CASCADE;

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`ID_USER_2`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE;

--
-- Constraints for table `hobby_post`
--
ALTER TABLE `hobby_post`
  ADD CONSTRAINT `hobby_post_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `hobby_post_ibfk_2` FOREIGN KEY (`ID_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`) ON DELETE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`ID_USER_2`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE;

--
-- Constraints for table `regular_post`
--
ALTER TABLE `regular_post`
  ADD CONSTRAINT `regular_post_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `regular_post_ibfk_2` FOREIGN KEY (`ID_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
