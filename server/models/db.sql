CREATE DATABASE IF NOT EXISTS `carodb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `carodb`;

-- Create table gamematch

CREATE TABLE IF NOT EXISTS `gamematch` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PlayerID1` int(11) NOT NULL,
  `PlayerID2` int(11) NOT NULL,
  `WinnerID` int(11) DEFAULT NULL,
  `TotalMove` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- REPLACE INTO `gamematch` (`ID`, `PlayerID1`, `PlayerID2`, `WinnerID`, `TotalMove`) VALUES
-- 	(1, 1, 2, 1,  15),
-- 	(2, 2, 3, 2, 25),
-- 	(3, 3, 4, 4,  35),
-- 	(4, 1, 4, 4,  45),
-- 	(5, 3, 2, 3,  55),
-- 	(6, 4, 5, 5, 50);

-- Create table user
CREATE TABLE IF NOT EXISTS `player` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `Avatar` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Gender` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N/A',
  `Score` int(11) NOT NULL DEFAULT 0,
  `MatchCount` int(11) NOT NULL DEFAULT 0,
  `WinCount` int(11) NOT NULL DEFAULT 0,
  `LoseCount` int(11) NOT NULL DEFAULT 0,
  `Rank` int(11) NOT NULL DEFAULT -1,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UNIQUE` (`Email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 