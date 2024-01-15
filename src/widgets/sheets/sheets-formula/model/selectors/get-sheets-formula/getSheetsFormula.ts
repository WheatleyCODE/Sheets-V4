import { buildSelector } from '@/shared/lib/store';

export const [useSheetsFormula, getSheetsFormula] = buildSelector((state) => state?.sheetsFormula?.sheetsFormula);
