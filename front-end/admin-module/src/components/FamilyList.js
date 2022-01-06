import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import axios from "axios";
import { Variables } from './APIURLs';
import { Link } from 'react-router-dom';

function FamilyList() {
    const [families, setfamilies] = useState([])

    async function getUserFamilies() {
        try {
            const apirequest = await axios.get(Variables.GetGroups);
            return apirequest.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function GetFamilies() {
        setfamilies(await getUserFamilies());
        return;
    }

    useEffect(() => {
        GetFamilies()
    })

    function MoreDetails(id) {
        document.getElementById("fam" + id).click();
    }

    return (
        families != null ?
            <div>
                {console.log(families)}
                <table className="table">
                    <thead>
                        <tr id="troverride">
                            <th>name</th>
                            <th>aantal planten</th>
                            <th>aantal gebruikers</th>
                            {/* <th style={{ Width: "10px" }}></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {families.map(fam => (
                            <tr onClick={() => MoreDetails(fam.id)} >
                                <td>{fam.name}</td>
                                <th>{fam.plantCount}</th>
                                <th>{fam.userCount}</th>
                                {/* <th style={{ Width: "10px" }}>X</th> */}
                                <Link hidden id={"fam" + fam.id} to={{ pathname: "/GroupInfo", state: { id: fam.id, name: fam.name } }} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            : <div>geen groepen gevonden.</div>

    )
}

export default FamilyList