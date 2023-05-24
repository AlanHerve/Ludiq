-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 23 Mai 2023 à 16:06
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `ludiq`
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
  `DESCRIPTION` text,
  `DATE_POST` date DEFAULT NULL,
  `DATE_ACTIVITY` date DEFAULT NULL,
  `CURRENT_REGISTERED` int(4) DEFAULT '1',
  `MAX_REGISTRATIONS` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `activity_director`
--

CREATE TABLE `activity_director` (
  `ID_USER` int(11) NOT NULL,
  `ID_ORGANISATION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `comment`
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
-- Structure de la table `friends`
--

CREATE TABLE `friends` (
  `ID_USER` int(11) NOT NULL,
  `ID_USER_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `hobby`
--

CREATE TABLE `hobby` (
  `ID_HOBBY` int(11) NOT NULL,
  `HOBBY_NAME` varchar(30) NOT NULL,
  `IMAGE` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `AVAILABLE` tinyint(1) DEFAULT '0',
  `IMAGE` varchar(60) DEFAULT NULL,
  `DESCRIPTION` text,
  `MODIFIED` int(1) DEFAULT '0',
  `TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `message`
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
-- Structure de la table `regular_post`
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
-- Structure de la table `user`
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
-- Index pour les tables exportées
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
  ADD PRIMARY KEY (`ID_USER`,`ID_ORGANISATION`);

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
-- Index pour la table `regular_post`
--
ALTER TABLE `regular_post`
  ADD PRIMARY KEY (`ID_REGULAR_POST`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_HOBBY` (`ID_HOBBY`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID_USER`,`USER_NAME`,`EMAIL`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `activity`
--
ALTER TABLE `activity`
  MODIFY `ID_ACTIVITY` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `hobby`
--
ALTER TABLE `hobby`
  MODIFY `ID_HOBBY` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `ID_MESSAGE` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `regular_post`
--
ALTER TABLE `regular_post`
  MODIFY `ID_REGULAR_POST` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `ID_USER` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
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
  ADD CONSTRAINT `activity_director_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE;

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`ID_REGULAR_POST`) REFERENCES `regular_post` (`ID_REGULAR_POST`) ON DELETE CASCADE;

--
-- Contraintes pour la table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`ID_USER_2`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE;

--
-- Contraintes pour la table `hobby_post`
--
ALTER TABLE `hobby_post`
  ADD CONSTRAINT `hobby_post_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `hobby_post_ibfk_2` FOREIGN KEY (`ID_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`) ON DELETE CASCADE;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`ID_USER_2`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE;

--
-- Contraintes pour la table `regular_post`
--
ALTER TABLE `regular_post`
  ADD CONSTRAINT `regular_post_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `regular_post_ibfk_2` FOREIGN KEY (`ID_HOBBY`) REFERENCES `hobby` (`ID_HOBBY`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
