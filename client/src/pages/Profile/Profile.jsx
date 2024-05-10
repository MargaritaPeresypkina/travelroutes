import React, { useEffect, useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import backgroundImg from "../../assets/beautiful-landscape.jpg";
import style from "../../css/Profile.module.css";
import head from "../../css/HeaderBackground.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoutes } from "../../redux/routes";
import { UserContext } from "../../UserContextProvider";
import {
  getAllUserRoutes,
  updateRouteIsUserroute,
} from "../../redux/userroutes";
import { getCompanionsOfRoute } from "../../redux/companionsOfRouteSlice";
import { updateUserDesc, updateUserName } from "../../redux/userSlice";

const Profile = () => {
  const { routes, loading, error } = useSelector((store) => store.routes);
  const { userroutes } = useSelector((store) => store.userroutes);
  const { companionsOfRoute } = useSelector(
    (store) => store.companionsOfRouteSlice
  );
  const dispatch = useDispatch();
  const { user, logout } = useContext(UserContext);

  const [deletedRouteIds, setDeletedRouteIds] = useState([]);

  useEffect(() => {
    dispatch(getAllRoutes());
    dispatch(getAllUserRoutes());
    dispatch(getCompanionsOfRoute());
  }, [dispatch]);

  const handleDelete = useCallback(
    async (routeId, userId) => {
      const userRoute = userroutes.find(
        (route) => route.routeId === routeId && route.userId === userId
      );
      if (!userRoute) {
        return;
      }
      console.log("userRoute", userRoute);
      const userRouteId = userRoute._id.toString();
      console.log("userRouteId", userRouteId);

      const userroute = userroutes.find((route) => route._id === userRouteId);

      const companions = companionsOfRoute.filter(
        (compRoute) =>
          compRoute.routeId === userroute.routeId && compRoute.userId === userId
      );

      console.log("companions", companions);
      console.log("companions.length", companions.length);
      if (companions.length > 0) {
        alert(
          "Нельзя удалить маршрут, пока есть попутчики. Договоритесь с ними об отмене."
        );
      } else {
        // Обновляем isUserRoute на сервере
        await dispatch(
          updateRouteIsUserroute({
            userRouteId: userRouteId,
            isUserRoute: false,
          })
        );
        // Обновляем состояние списка удаленных маршрутов
        setDeletedRouteIds([...deletedRouteIds, routeId]);
      }
    },
    [
      userroutes,
      companionsOfRoute,
      deletedRouteIds,
      setDeletedRouteIds,
      dispatch,
    ]
  );

  const handleLogout = () => {
    logout();
  };

  const filteredRoutes = routes.filter(
    (route) =>
      userroutes.some(
        (userRoute) =>
          userRoute.routeId === route._id &&
          userRoute.userId === user?._id &&
          userRoute.isUserRoute
      ) && !deletedRouteIds.includes(route._id.toString())
  );

  const [description, setDescription] = useState(user?.description || "");
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEditDescToggle = () => {
    setIsEditingDesc(!isEditingDesc);
  };

  const handleSaveDescription = async (description) => {
    try {

      await dispatch(updateUserDesc({ id: user._id, description }));

      setIsEditingDesc(false);
    } catch (error) {
      console.error("Ошибка при сохранении описания:", error);
    }
  };
  const [name, setName] = useState(user?.name || "");
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditNameToggle = () => {
    setIsEditingName(!isEditingName);
  };

  const handleSaveName = async (name) => {
    try {
      await dispatch(updateUserName({ id: user._id, name }));

      setIsEditingName(false);
    } catch (error) {
      console.error("Ошибка при сохранении имени:", error);
    }
  };

  return (
    <div>
      <div
        className={head.headerImage}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />
      <div className={style.profileContainer}>
        <h1>Профиль</h1>
        {user ? (
          <div className={style.userProfile}>
            <img src={user.avatarImage} alt="Avatar" className={style.avatar} />
            <div className={style.logoutbutton}>
              {isEditingName ? (
                <div className={style.textCorrect}>
                  <textarea value={name} onChange={handleNameChange} />
                  <div>
                    {" "}
                    <button onClick={() => handleSaveName(name)}>
                      Сохранить
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style.textCorrect}>
                  <p>Имя: {name}</p>
                  <div>
                    {" "}
                    <button
                      className={style.buttonEdit}
                      onClick={handleEditNameToggle}
                    >
                      Редактировать
                    </button>
                  </div>
                </div>
              )}
              <p>Email: {user.email}</p>
              {isEditingDesc ? (
                <div className={style.textCorrect}>
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <div>
                    {" "}
                    <button onClick={() => handleSaveDescription(description)}>
                      Сохранить
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style.textCorrect}>
                  <p>О себе: {description}</p>
                  <div>
                    {" "}
                    <button
                      className={style.buttonEdit}
                      onClick={handleEditDescToggle}
                    >
                      Редактировать
                    </button>
                  </div>
                </div>
              )}
              <button onClick={handleLogout}>Выйти из профиля</button>
            </div>
          </div>
        ) : (
          <p>Пользователь не вошел в систему</p>
        )}
        <h2>Мои маршруты</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div >
             {filteredRoutes.length === 0 ? (
              <p>Во пока не добавили свои маршруты</p>
            ) : (
              <div className={style.routesContainer}>
            {filteredRoutes.map((route) => (
              <div key={route._id.toString()} className={style.routeCard}>
                <Link to={`/myroute/routes/${route._id.toString()}`}>
                  <div>
                    <img
                      src={route.mainImage}
                      alt={route.name}
                      className={style.routeImage}
                    />
                    <div>
                      <h3>{route.name}</h3>
                      <p>{route.firstDescription}</p>
                    </div>
                  </div>
                </Link>
                <button
                  className={style.delButton}
                  onClick={() =>
                    handleDelete(route._id.toString(), user._id.toString())
                  }
                >
                  Удалить
                </button>
              </div>
            ))}</div>)}
          </div>
        )}
        <Link to="/routes">
          <button className={style.addButton}>Добавить маршруты</button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Profile);
