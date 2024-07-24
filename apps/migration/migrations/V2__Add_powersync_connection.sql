-- Grant access to PowerSync user (it should already exist, check README guide for this)
GRANT SELECT,
	INSERT,
	UPDATE,
	DELETE ON TABLE authors,
	collections,
	quotes,
	editors TO powersync_role;
	
-- Create publication (part of logical replication) for PowerSync
CREATE PUBLICATION powersync FOR TABLE authors,
collections,
quotes,
editors;