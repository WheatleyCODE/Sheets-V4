import { buildSelector } from '@/shared/lib/store';

export const [useSheetsHeader, getSheetsHeader] = buildSelector((state) => state?.sheetsHeader?.sheetsHeader);
