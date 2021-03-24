import { abi as ZombieOwnershipABI } from "./build/contracts/ZombieOwnership";
import { abi as  ZombieAttackABI } from "./build/contracts/ZombieAttack";
import { abi as  ZombieHelperABI } from "./build/contracts/ZombieHelper";
import { abi as  ZombieFeedingABI } from "./build/contracts/ZombieFeeding";
import { abi as  ZombieFactoryABI } from "./build/contracts/ZombieFactory";

export const ZombieContracts = {

    "ZombieOwnership": {
        "address": "0x953B2265Bc249E2Ec1e5ED489048305f5998862c",
        "abi": ZombieOwnershipABI
    },
    // "ZombieAttack": {
    //     "address": "0x0Eb28a324bEcF0Ab713Ecba3bb5aE709235C0FA2",
    //     "abi": ZombieAttackABI
    // },
    // "ZombieHelper": {
    //     "address": "0xE0F6bDfa1dF3F4B687CCF66FBeE886E0A776C2A5",
    //     "abi": ZombieHelperABI
    // },
    // "ZombieFeeding": {
    //     "address": "0xE9B2B998669D6FCd327346fC11D821314B561F47",
    //     "abi": ZombieFeedingABI
    // },
    "ZombieFactory": {
        "address": "0x23eaC7eB33B602A9A8C28CF9618c8CBb822781D5",
        "abi": ZombieFactoryABI
    }
}
