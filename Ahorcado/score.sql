-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-07-2025 a las 03:50:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `score`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `score`
--

CREATE TABLE `score` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tiempo` int(11) NOT NULL,
  `puntos` int(11) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `score`
--

INSERT INTO `score` (`id`, `nombre`, `tiempo`, `puntos`, `fecha`) VALUES
(4, 'Nate', 12, 0, '2025-07-13 18:47:32'),
(5, 'hola', 19, 87, '2025-07-13 19:03:43'),
(6, 'hola', 95, 0, '2025-07-13 19:35:22'),
(7, 'si', 25, 83, '2025-07-13 20:02:15'),
(8, 'Nate', 33, 69, '2025-07-13 20:09:00'),
(9, 'asdwasd', 39, 95, '2025-07-13 20:12:11'),
(10, 'a', 109, 40, '2025-07-13 20:13:20'),
(11, 'awe', 111, 40, '2025-07-13 20:13:23'),
(12, 'awert', 114, -14, '2025-07-13 20:13:25'),
(13, 'nate', 28, 74, '2025-07-13 20:20:21'),
(14, 'Nate', 24, 88, '2025-07-13 20:23:50'),
(15, 'hola', 63, 56, '2025-07-13 20:42:55'),
(16, 'pendejo', 48, 80, '2025-07-13 20:44:09'),
(17, 'pepe', 36, 80, '2025-07-13 20:46:19'),
(18, 'si', 57, 61, '2025-07-13 21:21:25'),
(19, 'hola', 26, 83, '2025-07-13 21:29:52');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
