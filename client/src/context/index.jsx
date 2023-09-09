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
            const data = await createCampaign({
                args: [
                    address, //owner address
                    form.title,
                    form.description,
                    form.target,
                    new Date(form.deadline).getTime(),
                    form.image,
                ]
            })
            console.log("Create Contract Success ==>", data)

        } catch (error) {
            console.log("Create Contract failed", error)

        }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('geCampaigns')
        // console.log("Our Campaigns==>", campaigns)

        const parsedCampaigns = campaigns.map((campaign, index) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: index,
        }))
        console.log("Formated Campaign: ", parsedCampaigns)

        return parsedCampaigns;
    }

    const getUserCampaign = async () => {
        const getAllCampaigns = await getCampaigns();

        const filteredCampaigns = getAllCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', [pId], {
            value: ethers.utils.parseEther(amount)
        })
        console.log("Donate data==>", data)
        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId])
        const numberOfDonations = donations[0].length

        const parsedDonations = [];
        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            })
        }

        console.log("Parsed Donations==>", parsedDonations)
        return parsedDonations;
    }

    return (
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            getCampaigns,
            getUserCampaign,
            donate,
            getDonations,
        }}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)

