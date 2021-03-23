import { abi as ZombieOwnershipABI } from "./build/contracts/ZombieOwnership";
import { abi as  ZombieAttackABI } from "./build/contracts/ZombieAttack";
import { abi as  ZombieHelperABI } from "./build/contracts/ZombieHelper";
import { abi as  ZombieFeedingABI } from "./build/contracts/ZombieFeeding";
import { abi as  ZombieFactoryABI } from "./build/contracts/ZombieFactory";

export const ZombieContracts = {

    "ZombieOwnership": {
        "address": "0xF72b5E4D0A71E637A0C58C4e815b99cA17b2edC0",
        "abi": ZombieOwnershipABI
    },
    "ZombieAttack": {
        "address": "0xBa66DdD6fCD6B2871276B99641a02E68419BA52c",
        "abi": ZombieAttackABI
    },
    "ZombieHelper": {
        "address": "0x755D04743493520594b78c601bA2a529022Ec330",
        "abi": ZombieHelperABI
    },
    "ZombieFeeding": {
        "address": "0x68F6EC1735121F22717d53003Ae901856c6c7e08",
        "abi": ZombieFeedingABI
    },
    "ZombieFactory": {
        "address": "0xB02Fb189f4112be6bDA1A24a82FAf29e6ee7dC2b",
        "abi": ZombieFactoryABI
    }
}
