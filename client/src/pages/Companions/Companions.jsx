import React, { useContext, useEffect } from "react";
import backgroundImg from "../../assets/beautiful-landscape.jpg";
import style from "../../css/Companions.module.css";
import myRouteComp from "../../css/MyRoute.module.css";
import head from "../../css/HeaderBackground.module.css";
import { getAllCompanions } from "../../redux/companions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  cancelCompanion,
  getCompanionsOfRoute,
  inviteCompanion,
} from "../../redux/companionsOfRouteSlice";
import { UserContext } from "../../UserContextProvider";

const Companions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { companions, loadingCompanions, companionsError } = useSelector(
    (store) => store.companions
  );

  const {user} = useContext(UserContext);

  const { companionsOfRoute } = useSelector(
    (store) => store.companionsOfRouteSlice
  );

  useEffect(() => {
    dispatch(getAllCompanions());
    dispatch(getCompanionsOfRoute(id));
  }, [dispatch, id]);

  const compOfRoute = companionsOfRoute.filter((companion)=> companion.routeId === id && companion.userId === user._id)
  
const companionIds = compOfRoute?.map((companion)=> companion.companionId)


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
  const handleInviteCompanion = (companionId) => {
    // Отправляем запрос на добавление строки companionroutes
    dispatch(inviteCompanion({ routeId: id, companionId, userId: user._id}));
  };
  return (
    <div>
      <div
        className={head.headerImage}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />
      <div className={style.companionsContainer}>
        <h1 className={style.companionsTitle}>Попутчики</h1>
        {loadingCompanions ? (
          <p>Loading...</p> 
        ) : companionsError ? (
          <p>Error: {companionsError}</p> 
        ) : (
          <div className={style.companionsList}>
            {companions.map((companion) => (
              <div className={style.companion} key={companion._id}>
                <div className={style.companionImageContainer}>
                  <img
                    src={companion.avatarImage}
                    alt="Companion"
                    className={style.companionImage}
                  />
                </div>
                <div className={style.companionInfo}>
                  <div className={myRouteComp.compInfo}>
                  <div className={style.loginname}>
                      <h3 className={style.companionName}>{companion.name} | </h3>
                      <p className={style.companionName}>
                        {companion.login}
                      </p>
                    </div>
                    <p className={style.companionDescription}>
                      {companion.description}
                    </p>
                  </div>
                  {companionIds.includes(companion._id) ? (
                    <button
                      className={style.inviteButton}
                      onClick={() => handleCancelCompanion(companion._id)}
                    >
                      Договориться об отмене
                    </button>
                  ) : (
                    <button
                      className={style.inviteButton}
                      onClick={() => handleInviteCompanion(companion._id)}
                    >
                      Пригласить
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Link to={`/myroute/routes/${id}`}>
          <button className={style.inviteButton}>Назад</button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Companions);
