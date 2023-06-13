-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 13 juin 2023 à 17:48
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ludiq`
--

-- --------------------------------------------------------

--
-- Structure de la table `activity`
--

CREATE TABLE `activity` (
  `ID_ACTIVITY` int(11) NOT NULL,
  `ID_ACTIVITY_DIRECTOR` int(11) NOT NULL,
  `ID_HOBBY` int(11) NOT NULL,
  `ADVANCEMENT` varchar(30) DEFAULT 'Beginner',
  `DESCRIPTION` text DEFAULT NULL,
  `DATE_POST` timestamp NULL DEFAULT current_timestamp(),
  `DATE_ACTIVITY` date DEFAULT NULL,
  `CURRENT_REGISTERED` int(4) DEFAULT 1,
  `MAX_REGISTRATIONS` int(4) NOT NULL DEFAULT 10,
  `IMAGE` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `activity`
--

INSERT INTO `activity` (`ID_ACTIVITY`, `ID_ACTIVITY_DIRECTOR`, `ID_HOBBY`, `ADVANCEMENT`, `DESCRIPTION`, `DATE_POST`, `DATE_ACTIVITY`, `CURRENT_REGISTERED`, `MAX_REGISTRATIONS`, `IMAGE`) VALUES
(1, 2, 1, 'Beginner', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id leo vitae eros elementum facilisis. Mauris ac eros a odio semper malesuada.', '2023-05-27 14:27:54', '2023-06-21', 1, 10, NULL),
(2, 2, 1, 'Beginner', NULL, '2023-05-27 14:27:54', '2023-06-23', 1, 10, NULL),
(3, 2, 4, 'Beginner', NULL, '2023-05-27 14:28:21', '2023-06-29', 1, 10, NULL),
(4, 2, 3, 'Beginner', NULL, '2023-05-27 14:28:21', NULL, 1, 10, NULL),
(5, 2, 4, 'Beginner', NULL, '2023-05-27 14:28:21', NULL, 1, 10, NULL),
(6, 3, 1, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10, NULL),
(7, 3, 7, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10, NULL),
(8, 3, 9, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10, NULL),
(9, 3, 8, 'Beginner', NULL, '2023-05-27 14:28:44', NULL, 1, 10, NULL),
(10, 3, 1, 'Beginner', NULL, '2023-05-27 14:29:09', NULL, 1, 10, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `activity_director`
--

CREATE TABLE `activity_director` (
  `ID_USER` int(11) NOT NULL,
  `ID_ORGANIZATION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `activity_director`
--

INSERT INTO `activity_director` (`ID_USER`, `ID_ORGANIZATION`) VALUES
(2, 3),
(3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `activity_participants`
--

CREATE TABLE `activity_participants` (
  `ID_ACTIVITY_PARTICIPANTS` int(11) NOT NULL,
  `ID_ACTIVITY` int(11) DEFAULT NULL,
  `ID_USER` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `comment`
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
(1, 3, 'yo', 1, '2023-06-13 15:46:48');

-- --------------------------------------------------------

--
-- Structure de la table `friends`
--

CREATE TABLE `friends` (
  `ID_USER` int(11) NOT NULL,
  `ID_USER_2` int(11) NOT NULL,
  `WAITING` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `friends`
--

INSERT INTO `friends` (`ID_USER`, `ID_USER_2`, `WAITING`) VALUES
(2, 3, 1),
(2, 5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `hobby`
--

CREATE TABLE `hobby` (
  `ID_HOBBY` int(11) NOT NULL,
  `HOBBY_NAME` varchar(30) NOT NULL,
  `IMAGE` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `hobby`
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
-- Structure de la table `hobby_post`
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
-- Déchargement des données de la table `hobby_post`
--

INSERT INTO `hobby_post` (`ID_HOBBY_POST`, `ID_HOBBY`, `ID_USER`, `EXPERIENCE`, `FREQUENCY`, `AVAILABLE`) VALUES
(1, 1, 2, 'Expert', 'Daily', 1),
(2, 1, 3, 'Advanced', '2-3/week', 0),
(3, 1, 4, 'Advanced', 'Weekly', 1),
(4, 9, 4, 'Expert', 'Monthly', 1),
(6, 16, 2, 'Expert', '2-3/week', 0),
(8, 2, 2, 'Beginner', 'Daily', 0),
(26, 3, 2, 'Beginner', 'Daily', 1),
(27, 9, 2, 'Beginner', 'Daily', 1),
(28, 4, 2, 'Beginner', 'Daily', 1),
(29, 1, 5, 'Beginner', 'Daily', 1),
(30, 2, 5, 'Beginner', 'Daily', 0);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `ID_MESSAGE` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_USER_2` int(11) NOT NULL,
  `CONTENT` text DEFAULT NULL,
  `TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `organization`
--

CREATE TABLE `organization` (
  `ID_ORGANIZATION` int(11) NOT NULL,
  `NAME_ORGANIZATION` varchar(64) NOT NULL,
  `AVATAR` varchar(120) DEFAULT NULL,
  `DESCRIPTION` varchar(64) DEFAULT NULL,
  `FAVORITE_HOBBY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `organization`
--

INSERT INTO `organization` (`ID_ORGANIZATION`, `NAME_ORGANIZATION`, `AVATAR`, `DESCRIPTION`, `FAVORITE_HOBBY`) VALUES
(1, 'Indépendant', NULL, NULL, NULL),
(2, 'AE', NULL, NULL, NULL),
(3, 'Troll Penché', NULL, NULL, NULL),
(4, 'Cook\'UT', NULL, NULL, NULL),
(5, 'Arrêt Dessin', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `regular_post`
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
(1, 5, 1, 'test', NULL, NULL, NULL, NULL, 0, 2, '2023-06-13 15:46:44');

-- --------------------------------------------------------

--
-- Structure de la table `user`
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
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`ID_USER`, `USER_NAME`, `USER_PSEUDO`, `USER_PASSWORD`, `EMAIL`, `AVATAR`, `FAVORITE_HOBBY`) VALUES
(2, 'Alan', 'Alan', '$2y$10$mTVn.8PWcUhvUEMmethDxehWaTfDMVEO5haxH8QNf0jcUcN1q2jZW', 'alan@gmail.com', NULL, NULL),
(3, 'Tegg', 'Tegg', '$2y$10$bQtqW3WS/LLj12H6AYha3uvW1z8xYRTWWElmQq88zFJq6DGuCvXua', 'Tegg@gmail.com', NULL, NULL),
(4, 'Sand', 'Sand', '$2y$10$9yzrcEouJzVE1FQidXVVjuRMwriCsqKJ3J3MEFNndKTz5fnGiKWOW', 'Sand@gmail.com', NULL, NULL),
(5, 'Tact', 'Tact', '$2y$10$BzPR88BwQBMYKYnA04.NsOFWAmettI9.7t.SLzN01LQKLO4C8kzBa', 'tact@gmail.com', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `userpostlikes`
--

CREATE TABLE `userpostlikes` (
  `ID_USER` int(11) NOT NULL,
  `ID_REGULAR_POST` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `userpostlikes`
--

INSERT INTO `userpostlikes` (`ID_USER`, `ID_REGULAR_POST`) VALUES
(5, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`ID_ACTIVITY`),
  ADD KEY `ID_ACTIVITY_DIRECTOR` (`ID_ACTIVITY_DIRECTOR`),
  ADD KEY `ID_HOBBY` (`ID_HOBBY`);

--
-- Index pour la table `activity_director`
--
ALTER TABLE `activity_director`
  ADD PRIMARY KEY (`ID_USER`,`ID_ORGANIZATION`),
  ADD KEY `ID_ORGANIZATION` (`ID_ORGANIZATION`);

--
-- Index pour la table `activity_participants`
--
ALTER TABLE `activity_participants`
  ADD PRIMARY KEY (`ID_ACTIVITY_PARTICIPANTS`),
  ADD KEY `ID_ACTIVITY` (`ID_ACTIVITY`),
  ADD KEY `ID_USER` (`ID_USER`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID_COMMENT`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_REGULAR_POST` (`ID_REGULAR_POST`);

--
-- Index pour la table `friends`
--
ALTER TABLE `friends`
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_USER_2` (`ID_USER_2`);

--
-- Index pour la table `hobby`
--
ALTER TABLE `hobby`
  ADD PRIMARY KEY (`ID_HOBBY`);

--
-- Index pour la table `hobby_post`
--
ALTER TABLE `hobby_post`
  ADD PRIMARY KEY (`ID_HOBBY_POST`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_HOBBY` (`ID_HOBBY`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`ID_MESSAGE`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_USER_2` (`ID_USER_2`);

--
-- Index pour la table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`ID_ORGANIZATION`),
  ADD KEY `FAVORITE_HOBBY` (`FAVORITE_HOBBY`);

--
-- Index pour la table `regular_post`
--
ALTER TABLE `regular_post`
  ADD PRIMARY KEY (`ID_REGULAR_POST`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `regular_post_ibfk_2` (`ID_HOBBY`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID_USER`),
  ADD KEY `FAVORITE_HOBBY` (`FAVORITE_HOBBY`);

--
-- Index pour la table `userpostlikes`
--
ALTER TABLE `userpostlikes`
  ADD PRIMARY KEY (`ID_USER`,`ID_REGULAR_POST`),
  ADD KEY `ID_REGULAR_POST` (`ID_REGULAR_POST`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activity`
--
ALTER TABLE `activity`
  MODIFY `ID_ACTIVITY` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `activity_participants`
--
ALTER TABLE `activity_participants`
  MODIFY `ID_ACTIVITY_PARTICIPANTS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `ID_COMMENT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `hobby`
--
ALTER TABLE `hobby`
  MODIFY `ID_HOBBY` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `hobby_post`
--
ALTER TABLE `hobby_post`
  MODIFY `ID_HOBBY_POST` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `ID_MESSAGE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `organization`
--
ALTER TABLE `organization`
  MODIFY `ID_ORGANIZATION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `regular_post`
--
ALTER TABLE `regular_post`
  MODIFY `ID_REGULAR_POST` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `ID_USER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`ID_ACTIVITY_DIRECTOR`) REFERENCES `activity_director` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`ID_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`) ON DELETE CASCADE;

--
-- Contraintes pour la table `activity_director`
--
ALTER TABLE `activity_director`
  ADD CONSTRAINT `activity_director_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `activity_director_ibfk_2` FOREIGN KEY (`ID_ORGANIZATION`) REFERENCES `organization` (`ID_ORGANIZATION`) ON DELETE CASCADE;

--
-- Contraintes pour la table `activity_participants`
--
ALTER TABLE `activity_participants`
  ADD CONSTRAINT `activity_participants_ibfk_1` FOREIGN KEY (`ID_ACTIVITY`) REFERENCES `activity` (`ID_ACTIVITY`),
  ADD CONSTRAINT `activity_participants_ibfk_2` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`);

--
-- Contraintes pour la table `userpostlikes`
--
ALTER TABLE `userpostlikes`
  ADD CONSTRAINT `userpostlikes_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`),
  ADD CONSTRAINT `userpostlikes_ibfk_2` FOREIGN KEY (`ID_REGULAR_POST`) REFERENCES `regular_post` (`ID_REGULAR_POST`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
