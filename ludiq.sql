-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
<<<<<<< HEAD
-- Hôte : 127.0.0.1
-- Généré le : sam. 17 juin 2023 à 23:48
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4
=======

-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2023 at 02:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

>>>>>>> origin/alan_routing

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
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
  `DESCRIPTION` text DEFAULT NULL,
  `DATE_POST` timestamp NULL DEFAULT current_timestamp(),
  `DATE_ACTIVITY` varchar(10) DEFAULT NULL,
  `CURRENT_REGISTERED` int(4) DEFAULT 1,
  `MAX_REGISTRATIONS` int(4) NOT NULL DEFAULT 10,
  `IMAGE` varchar(200) DEFAULT NULL,
  `TITLE` varchar(64) DEFAULT 'Activity'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `activity`
--

<<<<<<< HEAD
INSERT INTO `activity` (`ID_ACTIVITY`, `ID_ACTIVITY_DIRECTOR`, `ID_HOBBY`, `ADVANCEMENT`, `DESCRIPTION`, `DATE_POST`, `DATE_ACTIVITY`, `MAX_REGISTRATIONS`, `IMAGE`, `TITLE`) VALUES
(3, 2, 4, 'Beginner', NULL, '2023-05-27 14:28:21', NULL, 10, NULL, 'Activity'),
(5, 2, 4, 'Beginner', NULL, '2023-05-27 14:28:21', NULL, 10, NULL, 'Activity'),
(11, 2, 19, 'Beginner', 'We are currently working on the project in the Universitary Library :D', '2023-06-17 10:19:39', NULL, 4, NULL, 'Test of a new activity with a big title');
=======
INSERT INTO `activity` (`ID_ACTIVITY`, `ID_ACTIVITY_DIRECTOR`, `ID_HOBBY`, `ADVANCEMENT`, `DESCRIPTION`, `DATE_POST`, `DATE_ACTIVITY`, `CURRENT_REGISTERED`, `MAX_REGISTRATIONS`, `IMAGE`, `TITLE`) VALUES
(1, 2, 1, 'Beginner', NULL, '2023-05-27 14:27:54', NULL, 1, 10, NULL, 'Activity'),
(2, 2, 1, 'Beginner', NULL, '2023-05-27 14:27:54', NULL, 1, 10, NULL, 'Activity'),
(6, 3, 1, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10, NULL, 'Activity'),
(7, 3, 7, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10, NULL, 'Activity'),
(8, 3, 9, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10, NULL, 'Activity'),
(9, 3, 8, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10, NULL, 'Activity'),
(10, 3, 1, 'Beginner', NULL, '2023-05-27 14:29:09', NULL, 1, 10, NULL, 'Activity');

>>>>>>> origin/alan_routing

-- --------------------------------------------------------

--
-- Table structure for table `activity_director`
--

CREATE TABLE `activity_director` (
  `ID_USER` int(11) NOT NULL,
  `ID_ORGANIZATION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `activity_director`
--

INSERT INTO `activity_director` (`ID_USER`, `ID_ORGANIZATION`) VALUES
(2, 3),
(3, 19);

-- --------------------------------------------------------

--
-- Table structure for table `activity_participants`
--

CREATE TABLE `activity_participants` (
  `ID_ACTIVITY_PARTICIPANTS` int(11) NOT NULL,
  `ID_USER` int(11) DEFAULT NULL,
  `ID_ACTIVITY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `ID_COMMENT` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `CONTENT` text DEFAULT NULL,
  `ID_REGULAR_POST` int(11) NOT NULL,
  `TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`ID_COMMENT`, `ID_USER`, `CONTENT`, `ID_REGULAR_POST`, `TIME`) VALUES
(10, 2, 'azerty', 15, '2023-06-17 08:47:07');

-- --------------------------------------------------------

--
-- Table structure for table `favorite_hobby`
--

CREATE TABLE `favorite_hobby` (
  `ID_FAVORITE_HOBBY` int(11) NOT NULL,
  `ID_USER` int(11) DEFAULT NULL,
  `ID_HOBBY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorite_hobby`
--

INSERT INTO `favorite_hobby` (`ID_FAVORITE_HOBBY`, `ID_USER`, `ID_HOBBY`) VALUES
(1, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `ID_USER` int(11) NOT NULL,
  `ID_USER_2` int(11) NOT NULL,
  `WAITING` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`ID_USER`, `ID_USER_2`, `WAITING`) VALUES
(2, 3, 1),
(4, 5, 1),
(2, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `hobby`
--

CREATE TABLE `hobby` (
  `ID_HOBBY` int(11) NOT NULL,
  `HOBBY_NAME` varchar(30) NOT NULL,
  `IMAGE` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
(16, 'Sewing', 'Sowing.PNG'),
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
  `AVAILABLE` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `hobby_post`
--

INSERT INTO `hobby_post` (`ID_HOBBY_POST`, `ID_HOBBY`, `ID_USER`, `EXPERIENCE`, `FREQUENCY`, `AVAILABLE`) VALUES
(2, 1, 3, 'Advanced', '2-3/week', 0),
(3, 1, 4, 'Advanced', 'Weekly', 1),
(4, 9, 4, 'Expert', 'Monthly', 1),
(6, 16, 2, 'Expert', '2-3/week', 0),
(29, 1, 2, 'Beginner', 'Daily', 1),
(30, 2, 2, 'Beginner', 'Daily', 1),
(31, 3, 2, 'Beginner', 'Daily', 1),
(33, 5, 2, 'Beginner', 'Daily', 1),
(34, 1, 5, 'Beginner', 'Daily', 1),
(35, 2, 5, 'Beginner', 'Daily', 1),
(36, 3, 5, 'Beginner', 'Daily', 1),
(37, 4, 5, 'Beginner', 'Daily', 1);

-- --------------------------------------------------------

--
-- Structure de la table `invitation_organization`
--

CREATE TABLE `invitation_organization` (
  `ID_INVITATION_ORGANIZATION` int(11) NOT NULL,
  `ID_ORGANIZATION` int(11) DEFAULT NULL,
  `ID_USER` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `invitation_organization`
--

INSERT INTO `invitation_organization` (`ID_INVITATION_ORGANIZATION`, `ID_ORGANIZATION`, `ID_USER`) VALUES
(5, 19, 5);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `ID_MESSAGE` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_USER_2` int(11) NOT NULL,
  `CONTENT` text DEFAULT NULL,
  `TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`ID_MESSAGE`, `ID_USER`, `ID_USER_2`, `CONTENT`, `TIME`) VALUES
(1, 5, 2, 'coucou', '2023-06-17 11:22:21'),
(2, 3, 2, 'coucou\n', '2023-06-17 19:01:03');

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `ID_ORGANIZATION` int(11) NOT NULL,
  `NAME_ORGANIZATION` varchar(64) NOT NULL,
  `AVATAR` varchar(120) DEFAULT NULL,
  `DESCRIPTION` varchar(64) DEFAULT NULL,
  `FAVORITE_HOBBY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`ID_ORGANIZATION`, `NAME_ORGANIZATION`, `AVATAR`, `DESCRIPTION`, `FAVORITE_HOBBY`) VALUES
(1, 'Indépendant', NULL, NULL, NULL),
(2, 'AE', NULL, NULL, NULL),
(3, 'Troll Penché', NULL, NULL, NULL),
(4, 'Cook\'UT', NULL, NULL, NULL),
(5, 'Arrêt Dessin', NULL, NULL, NULL),
(19, 'UTGaming', NULL, 'On aime jouer aux jeux vidéos!', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `regular_post`
--

CREATE TABLE `regular_post` (
  `ID_REGULAR_POST` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_HOBBY` int(11) DEFAULT NULL,
  `DESCRIPTION` text DEFAULT NULL,
  `IMAGE1` varchar(200) DEFAULT NULL,
  `IMAGE2` varchar(200) DEFAULT NULL,
  `IMAGE3` varchar(200) DEFAULT NULL,
  `IMAGE4` varchar(200) DEFAULT NULL,
  `MODIFIED` int(1) DEFAULT 0,
  `LIKES` int(11) DEFAULT 0,
  `TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


--
-- Déchargement des données de la table `regular_post`
--

INSERT INTO `regular_post` (`ID_REGULAR_POST`, `ID_USER`, `ID_HOBBY`, `DESCRIPTION`, `IMAGE1`, `IMAGE2`, `IMAGE3`, `IMAGE4`, `MODIFIED`, `LIKES`, `TIME`) VALUES
(13, 2, NULL, 'aszdefrgtgrfedz', NULL, NULL, NULL, NULL, 0, 0, '2023-06-17 07:53:23'),
(14, 2, NULL, 'coucou', '648d668758df2_coronavirus-2.jpg', NULL, NULL, NULL, 0, 0, '2023-06-17 07:53:43'),
(15, 2, 1, 'hello!', '648d669869588_Cooking.jpg', NULL, NULL, NULL, 0, 1, '2023-06-17 09:55:28'),
(16, 5, NULL, 'zertyu', NULL, NULL, NULL, NULL, 0, 0, '2023-06-17 13:06:06');


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
  `AVATAR` varchar(60) DEFAULT NULL,
  `FAVORITE_HOBBY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID_USER`, `USER_NAME`, `USER_PSEUDO`, `USER_PASSWORD`, `EMAIL`, `AVATAR`, `FAVORITE_HOBBY`) VALUES
(2, 'Alan', 'Alan', '$2y$10$rMRJqEsZtygePNry0W7CTuRiZkd/mx8gQrd8Pc/g1/zBS7d0w6WCO', 'alan@gmail.com', 'glasses.png', NULL),
(3, 'Tegg', 'Tegg', '$2y$10$bQtqW3WS/LLj12H6AYha3uvW1z8xYRTWWElmQq88zFJq6DGuCvXua', 'Tegg@gmail.com', NULL, NULL),
(4, 'Sand', 'Sand', '$2y$10$HnAkh1b.uTL41LZs1iT/jeQpSLYWx6JfMp.qXGYeE7WnePsNcc90G', 'Sand@gmail.com', NULL, NULL),
(5, 'Tact', 'Tact', '$2y$10$lVGGPq/7qdy696WdVrEAZOs8z2kLFChoKjgWFxgAzTqWTbkGcjln6', 'tact@gmail.com', '648dafcca48d0_1634145141106.jpg', NULL),
(6, 'tact2', 'tact2', '$2y$10$nVXVLcQ2BRco3k4BCVrSSerfr8BlyrYNlBhVl9uKDlIvdg0J70r8C', 'raphael.perrin754@gmail.com', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_post_likes`
--

CREATE TABLE `user_post_likes` (
  `ID_USER_POST_LIKES` int(11) NOT NULL,
  `ID_USER` int(11) DEFAULT NULL,
  `ID_REGULAR_POST` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexes for table `activity_participants`
--
ALTER TABLE `activity_participants`
  ADD PRIMARY KEY (`ID_ACTIVITY_PARTICIPANTS`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_ACTIVITY` (`ID_ACTIVITY`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID_COMMENT`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_REGULAR_POST` (`ID_REGULAR_POST`);

--
-- Indexes for table `favorite_hobby`
--
ALTER TABLE `favorite_hobby`
  ADD PRIMARY KEY (`ID_FAVORITE_HOBBY`),
  ADD KEY `ID_HOBBY` (`ID_HOBBY`),
  ADD KEY `ID_USER` (`ID_USER`);

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
<<<<<<< HEAD
-- Index pour la table `invitation_organization`
--
ALTER TABLE `invitation_organization`
  ADD PRIMARY KEY (`ID_INVITATION_ORGANIZATION`),
  ADD KEY `ID_ORGANIZATION` (`ID_ORGANIZATION`),
  ADD KEY `ID_USER` (`ID_USER`);

--
-- Index pour la table `message`
=======
-- Indexes for table `message`
>>>>>>> origin/alan_routing
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`ID_MESSAGE`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_USER_2` (`ID_USER_2`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`ID_ORGANIZATION`),
  ADD KEY `FAVORITE_HOBBY` (`FAVORITE_HOBBY`);

--
-- Indexes for table `regular_post`
--
ALTER TABLE `regular_post`
  ADD PRIMARY KEY (`ID_REGULAR_POST`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `regular_post_ibfk_2` (`ID_HOBBY`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID_USER`),
  ADD KEY `FAVORITE_HOBBY` (`FAVORITE_HOBBY`);

--

-- AUTO_INCREMENT for dumped tables

-- Index pour la table `user_post_likes`
--
ALTER TABLE `user_post_likes`
  ADD PRIMARY KEY (`ID_USER_POST_LIKES`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_REGULAR_POST` (`ID_REGULAR_POST`);

--
-- AUTO_INCREMENT pour les tables déchargées

--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `ID_ACTIVITY` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
<<<<<<< HEAD
-- AUTO_INCREMENT pour la table `activity_participants`
--
ALTER TABLE `activity_participants`
  MODIFY `ID_ACTIVITY_PARTICIPANTS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
=======
>>>>>>> origin/alan_routing

-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `ID_COMMENT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;


--
-- AUTO_INCREMENT for table `favorite_hobby`
--
ALTER TABLE `favorite_hobby`
  MODIFY `ID_FAVORITE_HOBBY` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hobby`
--
ALTER TABLE `hobby`
  MODIFY `ID_HOBBY` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `hobby_post`
--
ALTER TABLE `hobby_post`
  MODIFY `ID_HOBBY_POST` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `invitation_organization`
--
ALTER TABLE `invitation_organization`
  MODIFY `ID_INVITATION_ORGANIZATION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `ID_MESSAGE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `ID_ORGANIZATION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `regular_post`
--
ALTER TABLE `regular_post`
  MODIFY `ID_REGULAR_POST` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID_USER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--

-- AUTO_INCREMENT pour la table `user_post_likes`
--
ALTER TABLE `user_post_likes`
  MODIFY `ID_USER_POST_LIKES` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées

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
-- Constraints for table `activity_participants`
--
ALTER TABLE `activity_participants`
  ADD CONSTRAINT `activity_participants_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`),
  ADD CONSTRAINT `activity_participants_ibfk_2` FOREIGN KEY (`ID_ACTIVITY`) REFERENCES `activity` (`ID_ACTIVITY`) ON DELETE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`ID_REGULAR_POST`) REFERENCES `regular_post` (`ID_REGULAR_POST`) ON DELETE CASCADE;

--
-- Constraints for table `favorite_hobby`
--
ALTER TABLE `favorite_hobby`
  ADD CONSTRAINT `favorite_hobby_ibfk_1` FOREIGN KEY (`ID_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`),
  ADD CONSTRAINT `favorite_hobby_ibfk_2` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`);

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
<<<<<<< HEAD
-- Contraintes pour la table `invitation_organization`
--
ALTER TABLE `invitation_organization`
  ADD CONSTRAINT `invitation_organization_ibfk_1` FOREIGN KEY (`ID_ORGANIZATION`) REFERENCES `organization` (`ID_ORGANIZATION`),
  ADD CONSTRAINT `invitation_organization_ibfk_2` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`);

--
-- Contraintes pour la table `message`
=======
-- Constraints for table `message`
>>>>>>> origin/alan_routing
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`ID_USER_2`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE;

--
-- Constraints for table `organization`
--
ALTER TABLE `organization`
  ADD CONSTRAINT `organization_ibfk_1` FOREIGN KEY (`FAVORITE_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`) ON DELETE SET NULL;

--
-- Constraints for table `regular_post`
--
ALTER TABLE `regular_post`
  ADD CONSTRAINT `regular_post_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `regular_post_ibfk_2` FOREIGN KEY (`ID_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`) ON DELETE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`FAVORITE_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`) ON DELETE SET NULL;

--
-- Contraintes pour la table `user_post_likes`
--
ALTER TABLE `user_post_likes`
  ADD CONSTRAINT `user_post_likes_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`),
  ADD CONSTRAINT `user_post_likes_ibfk_2` FOREIGN KEY (`ID_REGULAR_POST`) REFERENCES `regular_post` (`ID_REGULAR_POST`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
