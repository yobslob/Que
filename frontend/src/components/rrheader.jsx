import React from "react";
import Img from "../assets/logo.png";

const Header = () => {
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                borderBottom: "1px solid #ccc",
            }}
        >
            {/* Logo */}
            <div>
                <img
                    src={Img}
                    alt="App Logo"
                    style={{ height: "40px" }}
                />
            </div>

            {/* Sign In and Register */}
            <div>
                <button style={{ marginRight: "10px" }}>Sign In</button>
                <button>Register</button>
            </div>
        </header>
    );
};

export default Header;
