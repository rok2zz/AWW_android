import { Alert } from "react-native"
import axios from "axios";
import { Payload } from "../types/api";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { saveAndroidId, saveSetting, Setting } from "../slices/auth";
import { useMemo } from "react";
import { RootState } from "../slices";

interface JsonsHook {

}

export const useAuthActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators({ saveAndroidId, saveSetting }, dispatch), [ dispatch ]);
}

export const useAndroidId = (): string => {
    return useSelector((state: RootState) => state.auth.androidId)
}

export const useSetting = (): Setting => {
    return useSelector((state: RootState) => state.auth.setting);
}