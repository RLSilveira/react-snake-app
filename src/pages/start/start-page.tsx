import React from "react";
import "./start-page.css";

const LoginPage = () => {
    return (
        
        <>
            <div className='corpo'>1) Mateus - 100 Pontos</div>

            <form action="/form/submit" method="post">
                <div>
                    <label className='label'>Nome</label>
                    <input type="text" />
                </div>
            </form>

            <button className='button' type="button">Jogar!</button>
      </>
        
    );
}

export default LoginPage;