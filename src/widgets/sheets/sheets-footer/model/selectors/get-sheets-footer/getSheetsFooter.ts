import { buildSelector } from '@/shared/lib/store';

export const [useSheetsFooter, getSheetsFooter] = buildSelector((state) => state?.sheetsFooter?.sheetsFooter);
