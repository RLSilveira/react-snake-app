import React, { useEffect, useState } from "react";
import "./start-page.css";
import "../../services/records-service";
import recordesService from "../../services/records-service";
import { Record } from "../../models/record";
import { Link, useLocation } from "react-router-dom";


const LoginPage = () => {
  const [user, setUser] = useState<string>("");
  const [records, setRecords] = useState<Record[]>();

  const score = useLocation().state;

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    var r = await recordesService.Get();
    setRecords(r);
  };

  return (
    <>
      {score && <div>Game Over; {score}</div>
      }

      <div className="botao">
        <div>
          <label className="label">Nome:</label>
          <input type="text" value={user} onChange={e => setUser(e.target.value)} />
        </div>

        <Link
          to={{
            pathname: "/game",
            state: user,
          }}
        >
          <button className="button">Jogar</button>
        </Link>
      </div>

      <div className="corpo">
        <h2>Recordes:</h2>
        <ol className="ol">
          {records?.map((record: Record, i: any) => {
            return (
              <li key={i} className="li">
                {record.user} {record.score}
              </li>
            );
          })}
        </ol>
      </div>


    </>
  );
};

export default LoginPage;
