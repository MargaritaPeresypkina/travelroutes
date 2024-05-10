import React, { useContext, useEffect } from "react";
import backgroundImg from "../../assets/beautiful-landscape.jpg";
import style from "../../css/MyRoute.module.css";
import head from "../../css/HeaderBackground.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoutes } from "../../redux/routes";
import { getAllCompanions } from "../../redux/companions";
import {
  getCompanionsOfRoute,
  cancelCompanion,
} from "../../redux/companionsOfRouteSlice";
import { UserContext } from "../../UserContextProvider";

const MyRoute = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { routes, loadingRoutes, routesError } = useSelector(
    (store) => store.routes
  );
  const { companions, loadingCompanions, companionsError } = useSelector(
    (store) => store.companions
  );

  const { user } = useContext(UserContext);

  const { companionsOfRoute } = useSelector(
    (store) => store.companionsOfRouteSlice
  );

  useEffect(() => {
    dispatch(getAllRoutes());
    dispatch(getAllCompanions());
    dispatch(getCompanionsOfRoute(id));
  }, [dispatch, id]);

  const route = routes.find((route) => route._id === id);

  if (!route) {
    return (
      <div>
        <div
          className={head.headerImage}
          style={{ backgroundImage: `url(${backgroundImg})` }}
        />
        <div>Loading...</div>
      </div>
    );
  }
  const compOfRoute = companionsOfRoute.filter(
    (companion) => companion.routeId === id && companion.userId === user._id
  );

  const companionIds = compOfRoute?.map((companion) => companion.companionId);

  const routeCompanions = companions.filter((companion) =>
    companionIds.includes(companion._id)
  );

  const handleCancelCompanion = (companionId) => {
    // Находим соответствующую строку в companionsOfRoute по идентификатору попутчика
    const companionRoute = companionsOfRoute.find(
      (compRoute) => compRoute.companionId === companionId
    );
    if (companionRoute) {
      // Получаем идентификатор строки companionroutes
      const companionRouteId = companionRoute._id;
      // Отправляем запрос на удаление строки companionroutes
      dispatch(cancelCompanion(companionRouteId));
    }
  };

  return (
    <div>
      <div
        className={head.headerImage}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />
      <div className={style.routeContainer}>

        {loadingRoutes ? (
          <p>Loading...</p>
        ) : routesError ? (
          <p>Error: {routesError}</p>
        ) : (
          <div>
            <h1 className={style.routeTitle}>Мой маршрут</h1>
            <div className={style.routeInfo}>
              <img
                src={route.mainImage}
                alt="Route"
                className={style.routeImage}
                key={route._id.toString()}
              />
              <div className={style.routeDescription}>
                <h2 className={style.routeName}>{route.name}</h2>
                <p>{route.lurgeDescription}</p>
                <Link to={`/profile`}>
                  <button className={style.inviteButton}>
                    Вернуться в профиль
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <h2 className={style.companionsTitle}>Попутчики</h2>
        {loadingCompanions ? (
          <p>Loading...</p>
        ) : companionsError ? (
          <p>Error: {companionsError}</p>
        ) : routeCompanions.length === 0 ? (
          <p>Вы ещё не пригласили попутчиков</p>
        ) : (
          <div className={style.companionsList}>
            {routeCompanions.map((companion) => (
              <div key={companion._id} className={style.companion}>
                <div className={style.companionImageContainer}>
                  <img
                    src={companion.avatarImage}
                    alt="Companion"
                    className={style.companionImage}
                    key={companion._id.toString()}
                  />
                </div>
                <div className={style.companionInfo}>
                  <div className={style.compInfo}>
                    <div className={style.loginname}>
                      <h3 className={style.companionName}>
                        {companion.name} |{" "}
                      </h3>
                      <p className={style.companionName}>{companion.login}</p>
                    </div>

                    <p className={style.companionDescription}>
                      {companion.description}
                    </p>
                  </div>
                  <button
                    className={style.cancelButton}
                    onClick={() => handleCancelCompanion(companion._id)}
                  >
                    Договориться об отмене
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link to={`/companions/${id}`}>
          <button className={style.inviteButton}>Пригласить попутчика</button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(MyRoute);
