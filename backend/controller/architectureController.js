const architecture = async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (n) RETURN n');
    const records = result.records.map(record => record.get('n').properties);
    res.json({
      totalCount: records.length,
      data: records,
    });
  } catch (error) {
    console.error('Error fetching data from Neo4j:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await session.close();
  }
};
