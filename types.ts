import { RequestHandler } from "express-serve-static-core";
export const client = require('prom-client');
export const express = require('express');
export const axios = require('axios');
export const k8s = require('@kubernetes/client-node');
export const start = new Date(Date.now() - (1440 * 60000)).toISOString();
export const end = new Date(Date.now()).toISOString();
export type NodeController = {
    getInstantMetrics: RequestHandler,
    getNetworkTransmitBytes: RequestHandler,
    getNetworkReceiveBytes: RequestHandler
}
export type ClusterController = {
    getNamespaces: RequestHandler,
    getPodsByNamespace: RequestHandler,
    getNodes: RequestHandler
}
export type DashboardController = {
    getNumberOf: RequestHandler,
    getGeneralClusterInfo: RequestHandler,
    getTotalMem: RequestHandler,
    getTotalCpu: RequestHandler
    getTotalTransmit: RequestHandler,
    getTotalReceive: RequestHandler
}
export type CustomController = {
    customQueries: {
        query: string,
        name: string,
        applyToPods: boolean,
        applyToNodes: boolean
    }[];
    testCustomRoute: RequestHandler,
    addCustomRoute: RequestHandler
}
export type NumOfData = {
    nodes: number,
    pods: number,
    namespaces: number,
    deployments: number,
    ingresses: number,
    services: number
}
export type GeneralData = {
    totalUserCpu: number,
    totalSystemCpu: number,
    totalUserSystemCpu: number,
    residentMemBytes: number,
    eventLoopLag: number,
    totalActiveResources: number,
    totalActiveHandles: number,
    totalActiveRequests: number,
    heapSizeBytes: number,
    heapSizeUsed: number,
    //nodeDuration: number
}
export type PodController = {
    getCpuUsage: RequestHandler,
    getMemUsage: RequestHandler,
    getInstantMetrics: RequestHandler
}
export type ErrObject = {
    log: string,
    status: number,
    message: { err: string }
};

