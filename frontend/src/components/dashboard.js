import { useEffect, useState } from "react";
import {Wrapper} from "./wrapper";

export const Dashboard = () => {


    return (
        <Wrapper>
            <div class="table-responsive">
                <table class="table table-striped table-sm">

                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                            <th scope="col">Merchant Code</th>
                            <th scope="col">Merchant Name</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>date</td>
                            <td>type</td>
                            <td>code</td>
                            <td>name</td>
                            <td>
                                <a href="#" className="btn btn-sm btn-outline-dark">Delete</a>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </Wrapper>
    )   
}