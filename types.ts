import { RequestHandler } from "express-serve-static-core";
import { RequestInfo, RequestInit } from 'node-fetch';
export const express = require('express');
export const axios = require('axios');
export const k8s = require('@kubernetes/client-node');
export const start = new Date(Date.now() - (1440 * 60000)).toISOString();
export const end = new Date(Date.now()).toISOString();
export const fetch = (url: RequestInfo, init?: RequestInit) => import('node-fetch').then(({ default: fetch }) => fetch(url, init));
export type NodeController = {
    getInstantNetworkTransmitBytes: RequestHandler,
    getInstantNetworkRecievedBytes: RequestHandler,
}
export type ClusterController = {
    getNamespaces: RequestHandler,
    getPodsByNamespace: RequestHandler,
    getNodes: RequestHandler
}
export type DashboardController = {
    getTotalMem: RequestHandler,
    getTotalCpu: RequestHandler
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
