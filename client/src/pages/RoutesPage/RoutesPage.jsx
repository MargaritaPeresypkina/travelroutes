import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImg from "../../assets/beautiful-landscape.jpg";
import style from "../../css/RoutesPage.module.css";
import head from "../../css/HeaderBackground.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoutes } from "../../redux/routes";
import {
  getAllUserRoutes,
  updateRouteIsUserroute,
} from "../../redux/userroutes";
import { UserContext } from "../../UserContextProvider";

const RoutesPage = () => {
  const { routes, loading, error } = useSelector((store) => store.routes);
  const { userroutes } = useSelector((store) => store.userroutes);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    dispatch(getAllRoutes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUserRoutes());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      
      const userRoutes = userroutes
        .filter((route) => route.userId === user._id.toString())
        .reduce((acc, curr) => {
          acc[curr.routeId] = curr.isUserRoute; // Создаем объект, где ключ - это ID маршрута, значение - isUserRoute
          return acc;
        }, {});

     
      const filteredRoutes = routes.filter((route) =>
        userRoutes.hasOwnProperty(route._id)
      );

      // Применяем значение isUserRoute к каждому маршруту
      const updatedRoutes = filteredRoutes.map((route) => ({
        ...route,
        isUserRoute: userRoutes[route._id],
      }));

      setFilteredRoutes(updatedRoutes);
    }
  }, [user, routes, userroutes]);

  const handleSearch = useCallback(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const filtered = routes.map((route) => {
      const userRoute = userroutes.find(
        (userRoute) => userRoute.routeId === route._id && userRoute.userId === user._id
      );
      if (userRoute) {
        return { ...route, isUserRoute: userRoute.isUserRoute };
      } else {
        return { ...route, isUserRoute: false };
      }
    }).filter(
      (route) =>
        route.name.toLowerCase().includes(trimmedQuery) ||
        route.firstDescription.toLowerCase().includes(trimmedQuery)
    );
    setFilteredRoutes(filtered);
  }, [searchQuery, routes, userroutes, user]);
  
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleAddToProfile = async (routeId, userId, event) => {
    event.stopPropagation();
    event.preventDefault();

    const userRoute = userroutes.find(
      (route) => route.routeId === routeId && route.userId === userId
    );
    if (!userRoute) {
      return;
    }

    const userRouteId = userRoute._id.toString();

    try {
      // Отправляем запрос на обновление isUserRoute на сервер
      await dispatch(
        updateRouteIsUserroute({ userRouteId, isUserRoute: true })
      );

      // Обновляем состояние маршрутов
      const updatedRoutes = filteredRoutes.map((route) => {
        if (route._id === routeId) {
          return { ...route, isUserRoute: true };
        }
        return route;
      });
      setFilteredRoutes(updatedRoutes);
    } catch (error) {
      console.error("Error adding route to profile:", error);
    }
  };

  return (
    <div>
      <div
        className={head.headerImage}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />
      <div className={style.page}>
        <h1 className={style.pageTitle}>Маршруты</h1>
        <div className={style.searchBar}>
          <input
            type="text"
            className={style.searchInput}
            placeholder="Поиск по маршрутам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className={style.searchButton} onClick={handleSearch}>
            Искать
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className={style.routeGrid}>
            {filteredRoutes.length === 0 ? (
              <p>Маршруты не найдены</p>
            ) : (
              filteredRoutes.map((route) => (
                <div key={route._id.toString()} className={style.routeCard}>
                  <Link
                    to={`/routes/${route._id.toString()}`}
                    className={style.routeLink}
                  >
                    <div
                      className={style.routeImage}
                      style={{ backgroundImage: `url(${route.mainImage})` }}
                    />
                    <div className={style.overlay}></div>
                    <div className={style.routeDescription}>
                      <h2 className={style.routeTitle}>{route.name}</h2>
                      <p className={style.routeText}>
                        {route.firstDescription}
                      </p>
                      {!route.isUserRoute ? (
                        <button
                          onClick={(event) =>
                            handleAddToProfile(
                              route._id.toString(),
                              user._id.toString(),
                              event
                            )
                          }
                          className={style.addButton}
                        >
                          Добавить в профиль
                        </button>
                      ) : (
                        <span className={style.checkIcon}>
                          &#10003; Добавлен в профиль
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
        <Link to={`/profile`}>
          <button className={style.searchButton}>Перейти в профиль</button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(RoutesPage);
