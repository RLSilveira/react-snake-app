import React, { useEffect, useState } from "react";
import "./start-page.css";
import "../../services/records-service";
import recordesService from "../../services/records-service";
import { Record } from "../../models/record";

const LoginPage = () => {
  const [records, setRecords] = useState<Record[]>();
  useEffect(() => {
    getRecords();
  }, []);
  const getRecords = async () => {
    var r = await recordesService.Get();
    setRecords(r);
  };

  return (
    <>
      <div className="corpo">
        <h2>Recordes:</h2>
        <ol>
          {records?.map((record: Record, i: any) => {
            return (
              <li key={i}>
                {record.user} {record.score}
              </li>
            );
          })}
        </ol>
      </div>

      <form action="/form/submit" method="post">
        <div>
          <label className="label">Nome: </label>
          <input type="text" />
        </div>
      </form>

      <button className="button" type="button">
        Jogar!
      </button>
    </>
  );
};

export default LoginPage;
