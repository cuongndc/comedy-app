import { promises, constants } from 'fs';

export const maxAge = 60 * 60 * 24 * 365;

export async function hook(assetPath, res) {
    if (assetPath.endsWith('.mjs') || assetPath.endsWith('.css')) {
        try {
            await promises.access(`${assetPath}.br`, constants.R_OK | constants.W_OK);
            assetPath = `${assetPath}.br`;
            res.setHeader('Content-Encoding', 'br');
        } catch {}
    }

    return assetPath;
}
