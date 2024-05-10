import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoutes } from "../../redux/routes";
import backgroundImg from "../../assets/beautiful-landscape.jpg";
import style from "../../css/RouteInfo.module.css";
import head from "../../css/HeaderBackground.module.css";

const RouteInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { routes, loading, error } = useSelector((store) => store.routes);

  useEffect(() => {
    dispatch(getAllRoutes());
  }, [dispatch]);

 
  const route = routes.find((route) => route._id === id);

  
  if (!route) {
    return (
      <div key="loading">
        <div
          className={head.headerImage}
          style={{ backgroundImage: `url(${backgroundImg})` }}
        />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div key={route._id.toString()}
>
      <div
        className={head.headerImage}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />
      <div className={style.routeInfoContainer}>
        {loading ? (
          <p key="loading">Loading...</p>
        ) : error ? (
          <p key="error">Error: {error}</p>
        ) : (
          <div>
            <h2 className={style.routeTitle}>{route.name}</h2>
            <img
              src={route.mainImage}
              alt="Route"
              className={style.routeImage}
            />
            <p className={style.lurgeDescription}>{route.lurgeDescription}</p>
            <h2 className={style.h2}>{route.arrivalMethod.title}</h2>
            {route.arrivalMethod.desc.map((descItem, index) => (
              <div key={index}>
                <p className={style.text}>{descItem.text}</p>
              </div>
            ))}
            {route.arrivalMethod.images.map((imageItem, index) => (
              <div key={imageItem._id.toString()}>
                <img
                  src={imageItem.image}
                  className={style.routeImage}
                  alt={imageItem.imageDesc}
                />
                <div className={style.imageDescription}>
                  <p className={style.text}>{imageItem.imageDesc}</p>
                  <p className={style.text}>{imageItem.coordinates}</p>
                </div>
              </div>
            ))}
            <h2 className={style.h22}>ЧТО ПОСЕТИТЬ?</h2>
            {route.places.map((placeItem, index) => (
              <div key={index}>
                <h2 className={style.h2}>{placeItem.title}</h2>
                {placeItem.desc.map((placeItemDesc, index) => (
                  <div key={index}>
                    <p className={style.text}>{placeItemDesc.text}</p>
                  </div>
                ))}
                {placeItem.images.map((placeItemImage, index) => (
                  <div key={index}>
                    <img
                      src={placeItemImage.image}
                      alt="Route2"
                      className={style.routeImage}
                    />
                    <div className={style.imageDescription}>
                      <p className={style.text}>{placeItemImage.imageDesc}</p>
                      <p className={style.text}>{placeItemImage.coordinates}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <h2 className={style.h2}>{route.meals.title}</h2>
            {route.meals.desc.map((mealItem, index) => (
              <div key={index}>
                <p className={style.text}>{mealItem.text}</p>
              </div>
            ))}
            {route.meals.images.map((imageItem, index) => (
              <div key={index}>
                <img
                  src={imageItem.image}
                  alt="Route"
                  className={style.routeImage}
                />
                <div className={style.imageDescription}>
                  <p className={style.text}>{imageItem.imageDesc}</p>
                  <p className={style.text}>{imageItem.coordinates}</p>
                </div>
              </div>
            ))}

            <h2 className={style.h2}>{route.accommodation.title}</h2>
            {route.accommodation.desc.map((accItem, index) => (
              <div key={index}>
                <p className={style.text}>{accItem.text}</p>
              </div>
            ))}
            {route.accommodation.images.map((imageItem, index) => (
              <div key={index}>
                <img
                  src={imageItem.image}
                  alt="Route"
                  className={style.routeImage}
                />
                <div className={style.imageDescription}>
                  <p className={style.text}>{imageItem.imageDesc}</p>
                  <p className={style.text}>{imageItem.coordinates}</p>
                </div>
              </div>
            ))}
            <h2 className={style.h2}>{route.recommendation.title}</h2>
            {route.recommendation.desc.map((recItem, index) => (
              <div key={index}>
                <p className={style.text}>{recItem.text}</p>
              </div>
            ))}
            {route.recommendation.images.map((imageItem, index) => (
              <div key={index}>
                <img
                  src={imageItem.image}
                  alt="Route"
                  className={style.routeImage}
                />
                <div className={style.imageDescription}>
                  <p className={style.text}>{imageItem.imageDesc}</p>
                  <p className={style.text}>{imageItem.coordinates}</p>
                </div>
              </div>
            ))}
            <h2 className={style.h2}>{route.usefulInfo.title}</h2>
            {route.usefulInfo.desc.map((infoItem, index) => (
              <div key={index}>
                <p className={style.text}>{infoItem.text}</p>
              </div>
            ))}
            {route.usefulInfo.images.map((imageItem, index) => (
              <div key={index}>
                <img
                  src={imageItem.image}
                  alt="Route"
                  className={style.routeImage}
                />
                <div className={style.imageDescription}>
                  <p className={style.text}>{imageItem.imageDesc}</p>
                  <p className={style.text}>{imageItem.coordinates}</p>
                </div>
              </div>
            ))}
            <p className={style.lurgeDescription}>{route.conclusion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(RouteInfo) ;
