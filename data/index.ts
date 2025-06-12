// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { OutstandingBalance, SOA, Statement } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database functions
export async function getOutstandingBalances(): Promise<OutstandingBalance[]> {
  const { data, error } = await supabase
    .from('outstanding_balance')
    .select('id, created_at, updated_at, name, balance, sector')
    .order('balance', { ascending: false });

  if (error) {
    console.error('Error fetching outstanding balances:', error);
    throw new Error('Failed to fetch outstanding balances');
  }

  return data || [];
}

export async function getSOAEntries(): Promise<SOA[]> {
  const { data, error } = await supabase
    .from('soa')
    .select('id, created_at, amount, year, month, type')
    .order('year', { ascending: false })
    .order('month', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching SOA entries:', error);
    throw new Error('Failed to fetch SOA entries');
  }

  return data || [];
}

export async function getStatements(): Promise<Statement[]> {
  const { data, error } = await supabase
    .from('statement')
    .select('id, created_at, updated_at, name, amount')
    .order('amount', { ascending: false });

  if (error) {
    console.error('Error fetching statements:', error);
    throw new Error('Failed to fetch statements');
  }

  return data || [];
}