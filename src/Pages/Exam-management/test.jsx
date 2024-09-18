useEffect(() => {
  const fetchStudents = async () => {
    try {
     

      const liveData = await fetch(
        "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/students"
      );
      console.log("liveData:", liveData);
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  fetchStudents();
}, []);