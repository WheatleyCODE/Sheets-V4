import { buildSelector } from '@/shared/lib/store';

export const [useSheetsTable, getSheetsTable] = buildSelector((state) => state?.sheetsTable?.sheetsTable);
