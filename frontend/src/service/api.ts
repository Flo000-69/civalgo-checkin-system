import { CheckInEvent } from "@/models/check-in-event";

const API_URL = 'http://localhost:4000';

export async function checkIn(name: string, site_id: string): Promise<void> {
  const response = await fetch(`${API_URL}/check-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, site_id }),
  });

  if (!response.ok) {
    throw new Error('Failed to check in');
  }
}

export async function checkOut(name: string, site_id: string): Promise<void> {
  const response = await fetch(`${API_URL}/check-out`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, site_id }),
  });

  if (!response.ok) {
    throw new Error('Failed to check out');
  }
}

export async function getOnSiteWorkers(): Promise<CheckInEvent[]> {
  const response = await fetch(`${API_URL}/on-site`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch on-site workers');
  }

  return response.json();
}

export async function getHistory(filters: {
    name?: string;
    siteId?: string;
    from?: string;
    to?: string;
  }): Promise<CheckInEvent[]> {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.siteId) params.append('siteId', filters.siteId);
    if (filters.from) params.append('from', filters.from);
    if (filters.to) params.append('to', filters.to);
  
    const response = await fetch(`${API_URL}/history?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }
  
    return response.json();
  }