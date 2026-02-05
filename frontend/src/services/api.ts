import axios from 'axios';
import {
  SummaryResponse,
  DriversResponse,
  RiskFactorsResponse,
  RecommendationsResponse,
} from '../types/api';

const API_BASE_URL = '/api';

export const api = {
  getSummary: async (): Promise<SummaryResponse> => {
    const response = await axios.get(`${API_BASE_URL}/summary`);
    return response.data;
  },

  getDrivers: async (): Promise<DriversResponse> => {
    const response = await axios.get(`${API_BASE_URL}/drivers`);
    return response.data;
  },

  getRiskFactors: async (): Promise<RiskFactorsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/risk-factors`);
    return response.data;
  },

  getRecommendations: async (): Promise<RecommendationsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/recommendations`);
    return response.data;
  },
};
