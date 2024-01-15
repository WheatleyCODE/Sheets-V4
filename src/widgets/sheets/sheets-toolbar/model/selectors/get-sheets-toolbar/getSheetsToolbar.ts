import { buildSelector } from '@/shared/lib/store';

export const [useSheetsToolbar, getSheetsToolbar] = buildSelector((state) => state?.sheetsToolbar?.sheetsToolbar);
