import 'react-credit-cards-2/es/styles-compiled.css';
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import './style.css'
const Billing = () => {

    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    return (
        <div className="billingContainer">
            <div class='billingLeftContainer'>
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <form>
                    <input
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />

                </form>

            </div>
            <div className="billingRightContainer">
                Test
            </div>
        </div>

    )

}

export default Billing;