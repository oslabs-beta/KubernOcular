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
export type CustomQuery = {
    query: string,
    name: string,
    yAxisType: string
}
export type CustomController = {
    customClusterQueries: CustomQuery[],
    customNodeQueries: CustomQuery[],
    customPodQueries: CustomQuery[],
    testCustomRoute: RequestHandler,
    addCustomRoute: RequestHandler,
    getCustomRoutes: RequestHandler,
    deleteCustomRoute: RequestHandler
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

export type HierarchyController = {
    getElements: RequestHandler
}

export type ErrObject = {
    log: string,
    status: number,
    message: { err: string }
};

export type Elements = {
    data: {
        id?: string,
        label?: string,
        source?: string,
        target?: string,
        type?: string
    },
    position?: {
        x: number,
        y: number
    }
}