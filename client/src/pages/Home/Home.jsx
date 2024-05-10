import React, { useContext, useEffect } from "react";
import backgroundImg from "../../assets/beautiful-landscape.jpg";
import style from "../../css/Home.module.css";
import Button from "../../components/Button/Button";
import IdeaBlock from "../../components/IdeaBlock/IdeaBlock";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoutes } from "../../redux/routes";
import { inviteUserRoutes } from "../../redux/userroutes";
import { UserContext } from "../../UserContextProvider";

const Home = () => {
  const { routes, loading, error } = useSelector((store) => store.routes);
  const {user} = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoutes());
  }, [dispatch]);
  const routeIds = routes.map((route)=> route._id)
  console.log("routeIds", routeIds)
  console.log(" user._id", user?._id)
  dispatch(inviteUserRoutes({routeIds, userId: user._id}))

  return (
    <div className={style.home}>
      <div
        className={style.background}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className={style.overlay}></div> 
        <div className={style.content}>
          <h1 className={style["content-h1"]}>
            Приглашайте новых друзей и вместе отправляйтесь в удивительные
            путешествия по Беларуси!
          </h1>
          <p className={style["content-p"]}>
            Добро пожаловать на наш сайт о захватывающих путешествиях по
            живописной Беларуси! Здесь вы можете пригласить незнакомых
            путешественников и вместе исследовать многообразные маршруты по
            нашей прекрасной стране. От пышных лесов и таинственных озер до
            исторических замков и уютных деревень - у нас есть маршруты для
            каждого вкуса. Присоединяйтесь к нам, чтобы открыть для себя новые
            уголки Беларуси и создать незабываемые воспоминания вместе с новыми
            друзьями!
          </p>
          <div className={style.buttons}>
            <Link to="/routes">
              <Button text={"Маршруты"} />
            </Link>
            <Link to="/profile">
              <Button text={"В профиль"} />
            </Link>
          </div>
        </div>
      </div>

     
      <div className={style.ideablock}>
        <h1 className={style["content-idea-h1"]}>Об идее проекта</h1>
        <div className={style.ideas}>
          <IdeaBlock
            title={"Уникальность наших маршрутов"}
            text={
              "Отправляйтесь в увлекательные путешествия по удивительным местам Беларуси, доступным только с помощью нашего сайта. Исследуйте маршруты, которые не только вдохновляют и удивляют, но и создают незабываемые впечатления. От пышных лесов до таинственных озер, каждый маршрут предлагает неповторимые приключения и уникальные возможности для открытия для себя новых горизонтов."
            }
          />
          <IdeaBlock
            title={"Знакомство с новыми людьми"}
            text={
              "Создавайте собственные маршруты и приглашайте незнакомых путешественников присоединиться к вам. Познакомьтесь с единомышленниками, совершайте захватывающие поездки вместе и делитесь впечатлениями о путешествиях. Новые друзья, которых вы встретите по пути, обогатят ваш опыт и сделают каждое приключение еще более незабываемым."
            }
          />
          <IdeaBlock
            title={"Поиск вдохновения и приключений"}
            text={
              "Откройте для себя новые горизонты и исследуйте уникальные места, чтобы найти вдохновение и приключения. Наш сайт поможет вам открыть интересные маршруты, которые позволят вам расширить ваш опыт и запомнить каждое путешествие на долгие годы. Независимо от того, предпочитаете ли вы тихие прогулки вдоль реки или захватывающие восхождения на вершины гор, у нас есть маршрут, который подходит именно вам."
            }
          />
        </div>
      </div>
      <div className={style.popularRoutes}>
        <h1 className={style["popularRoutes-h1"]}>Маршруты дня</h1>
        <div className={style.spacer}></div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className={style.routeImages}>
            {routes[0] && (
              <Link
                to={`/routes/${routes[0]._id.toString()}`}
                className={style.routeLink}
              >
                <div className={style.smallRoutes}>
                  <img src={routes[0].mainImage} alt="Small Route 1" />
                  <div className={style.routeSmallDescription}>
                    <h2 className={style.routeTitle}>{routes[0].name}</h2>
                    <p className={style.routeText}>
                      {routes[0].firstDescription}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {routes[1] && (
              <Link
                to={`/routes/${routes[1]._id.toString()}`}
                className={style.routeLink}
              >
                <div className={style.largeRoute}>
                  <img src={routes[1].mainImage} alt="Large Route" />
                  <div className={style.routeLargeDescription}>
                    <h2 className={style.routeLargeTitle}>{routes[1].name}</h2>
                    <p className={style.routeLargeText}>
                      {routes[1].firstDescription}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {routes[2] && (
              <Link
                to={`/routes/${routes[2]._id.toString()}`}
                className={style.routeLink}
              >
                <div className={style.smallRoutes}>
                  <img src={routes[2].mainImage} alt="Small Route 2" />
                  <div className={style.routeSmallDescription}>
                    <h2 className={style.routeTitle}>{routes[2].name}</h2>
                    <p className={style.routeText}>
                      {routes[2].firstDescription}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        )}
        <div className={style.routeTextDescription}>
          Находите свои собственные маршруты, создавайте группы с
          единомышленниками и приглашайте других путешественников присоединиться
          к вам.
          <br />
          <br /> Наблюдайте за выбором других пользователей и делитесь своими
          приключениями, чтобы вместе создавать незабываемые впечатления.
          Присоединяйтесь к нам и погрузитесь в мир открытий и приключений
          вместе с новыми друзьями!
        </div>
      </div>

      <div className={style.guideBlock}>
        <h1 className={style["guid-h1"]}>
          Путеводитель по созданию группы и маршрутов
        </h1>
        <div className={style["spacer-red"]}></div>
        <p className={style["guide-intro"]}>
          Данный путеводитель поможет вам использовать наш сайт для создания
          группы и выбора маршрутов для путешествий. Давайте рассмотрим, как
          пользоваться данным сайтом:
        </p>
        <ol className={style["guide-steps"]}>
          <li>
            1. Если вы не зарегистрированы, пройдите регистрацию на сайте.
          </li>
          <li>
            2. Если вы не авторизованы, войдите в систему, используя свои
            учетные данные.
          </li>
          <li>
            3. Зайдите в свой профиль и перейдите в раздел "Мои маршруты".
          </li>
          <li>4. Нажмите кнопку "Добавить", чтобы создать новый маршрут.</li>
          <li>5. Выберите один из доступных маршрутов.</li>
          <li>
            6. После добавления маршрута в ваш профиль, вы сможете увидеть его
            под вашими данными.
          </li>
          <li>
            {" "}
            7. При клике на маршрут откроется страница с информацией о нем,
            включая список попутчиков.
          </li>
          <li>
            {" "}
            8. Чтобы добавить нового попутчика, нажмите кнопку "Добавить
            попутчика" и следуйте указаниям на экране.
          </li>
          <li>
            9. Пригласите попутчиков на ваш маршрут и наслаждайтесь путешествием
            вместе!
          </li>
        </ol>
        <div className={style.button}>
          {" "}
          <Link to="/profile">
            {" "}
            
            <Button text={"Перейти в профиль"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Home);
