import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const { contract } = useContract('0x390a9a0eF76c71256344A5173AE5372b20D3DDb2')
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address, //owner address
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image,
            ])
            console.log("Create Contract Success ==>", data)

        } catch (error) {
            console.log("Create Contract failed", error)

        }
    }

    return (
        <StateContext.Provider value={{ address, contract, connect, createCampaign: publishCampaign }}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)

