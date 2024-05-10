import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./redux/userSlice";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.userSlice);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Загрузка пользователей
    dispatch(getAllUsers())
      .then(() => setLoading(false)) // Помечаем, что данные загружены
      .catch((error) => {
        console.error("Error loading users:", error);
        setLoading(false); // Если произошла ошибка, также помечаем, что данные загружены
      });
  }, [dispatch]);

  useEffect(() => {
    // Проверяем, есть ли сохраненный пользователь в localStorage
    const id = localStorage.getItem("userId");
    const foundUser = users.find((user) => user._id === id);
    if (foundUser) {
      setUser(foundUser); // Устанавливаем пользователя, если найден
    }
  }, [users]);

  // Устанавливаем пользователя в localStorage, когда он изменяется
  useEffect(() => {
    if (user) {
      localStorage.setItem("userId", user._id);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("userId"); // Очищаем данные пользователя из localStorage
    setUser(null); // Устанавливаем пользователя в null
  };

  // Если данные загружаются, отображаем Loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Возвращаем контекст со значениями пользователя и состоянием загрузки
  return (
    <UserContext.Provider value={{ user, onChange: setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}
