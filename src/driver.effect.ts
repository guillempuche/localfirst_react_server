// https://github.com/powersync-ja/powersync-js/blob/main/packages/common/src/client/AbstractPowerSyncDatabase.ts
// https://github.com/powersync-ja/powersync-js/blob/main/packages/kysely-driver/src/sqlite/sqlite-driver.ts

import type { AbstractPowerSyncDatabase } from '@powersync/common'
import { Kysely, type KyselyConfig } from 'kysely'

export const wrapPowerSyncWithKysely = <T>(
	db: AbstractPowerSyncDatabase,
	options?: KyselyConfig,
) => {
	return new Kysely<T>({
		dialect: new PowerSyncDialect({
			db,
		}),
		...options,
	})
}
