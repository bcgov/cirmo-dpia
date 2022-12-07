export const usePIALookup = () => {
    const history = useHistory();
    const { openToast } = useToast();
  
    const [isFetching, setFetching] = useState(true);
    const [tableData, setTableData] = useState({
      columns: LookupAssessmentTableColumns,
      rows: [],
      totalRows: 0,
      currentPage: 0,
    });
    const [selectedSearchFilters, setSelectedSearchFilters] = useState([]);
    const [zeroStates] = useState({
      fromDate: '',
      toDate: '',
      submissionDate: '',
      submissionStatus: '',
      paymentStatus: '',
      agent: '',
      healthType: '',
      orderBy: '',
      query: '',
      activeTask: ''
    });
  
    const handleSetTableData = (results, numberOfResults, currentPage, updatePermission) => {
      setTableData(prevState => ({
        ...prevState,
        totalRows: numberOfResults,
        currentPage: parseInt(currentPage),
        rows: results.map(({id, confirmationNumber, name, lastUpdated, owner,submissionDate ,organizationStatus, employeeStatus, operatorStatus, employeePaymentStatus, operatorPaymentStatus, latePaymentFlag, paymentDetermination}) => ({
          paymentDetermination,
          latePaymentFlag,
          confirmationNumber,
          lastUpdated: lastUpdated && utcToLocalString(lastUpdated,'YYYY/MM/DD hh:mm A'),
          owner,
          name,
          submissionDate: submissionDate && cdtToLocalString(submissionDate,'YYYY/MM/DD hh:mm A'),
          organizationStatus: (
            <StatusCell submissionStatus={organizationStatus}/>
          ),
          employeeBenefitStatus: (
            <StatusCell submissionStatus={employeeStatus}/>
          ),
          operatorBenefitStatus: (
            <StatusCell submissionStatus={operatorStatus}/>
          ),
          viewOrg: (
            <Button
              text="View"
              variant="outlined"
              size="small"
              onClick={() => history.push(`${Route.AdminPortalOrganizationDetails}/${id}`)}
            />
          ),
          operatorPaymentStatus: operatorPaymentStatus&&<PaymentStatusSelect initialState={operatorPaymentStatus} width={200} id={id} type="operator" updatePermission={updatePermission} applicationStatus={operatorStatus} />,
          employeePaymentStatus: employeePaymentStatus&&<PaymentStatusSelect initialState={employeePaymentStatus} width={200} id={id} type="employee" updatePermission={updatePermission} applicationStatus={employeeStatus} />
        }))
      }))
    };
  
    useEffect(() => {
      (async () => {
        try {
          setFetching(true);
  
          const filterValues = parseUrlFilters(history);
          const {
            page,
            order,
            fromDate,
            toDate,
            submissionDate,
            submissionStatus,
            paymentStatus,
            paymentDeterminationStatus,
            agent,
            healthType,
            orderBy,
            query,
            activeTask,
          } = filterValues;
  
          // Find applicable filters that have been changed (not in their zero-state)
          const appliedFilters = [
            'date',
            'submissionDate',
            'submissionStatus',
            'paymentStatus',
            'paymentDeterminationStatus',
            'agent',
            'healthType',
            'orderBy',
            'query',
            'activeTask'
          ].filter(f => !formatFilterPills[f].isZeroState(filterValues));
  
          // Update state with the filters that have been applied
          // this populates the filter "pills" at the top of the work list
          setSelectedSearchFilters(appliedFilters.map(f => ({
            value: f,
            label: formatFilterPills[f].display(filterValues),
          })));
  
          // Construct query
          let qs = `page=${page || 0}&agent=${agent || 'all'}&order=${order || 'asc'}&orderBy=${orderBy || 'name'}`;
          if(fromDate) {
            qs += `&fromDate=${moment(fromDate).toISOString()}`;
          }
  
          if(toDate) {
            qs += `&toDate=${moment(toDate).toISOString()}`;
          }
  
          if(submissionDate) {
            qs += `&submissionDate=${moment(submissionDate).toISOString()}`;
          }
  
          if(submissionStatus){
            let [statusType, status] = submissionStatus.split("_");
            qs += `&statusType=${statusType}&status=${status}`;
          }
          let finalPaymentStatus;
          if(paymentStatus) {
            let [statusType, status] = paymentStatus.split("_");
  
            switch (status) {
                case 'paid':
                  finalPaymentStatus ='Paid'
                  break;
                case 'notPaid':
                  finalPaymentStatus ='Not Paid'
                  break;
                case 'pending':
                  finalPaymentStatus ='Pending Payment'
                  break;
                case 'failed':
                  finalPaymentStatus ='Payment Failed'
                  break;
  
            }
            qs += `&paymentStatusType=${statusType}&paymentStatus=${finalPaymentStatus}`;
          }
          let finalPaymentDeterminationStatus;
          if(paymentDeterminationStatus) {
            let [statusType, status] = paymentDeterminationStatus.split("_");
  
            switch (status) {
                case 'allPaid':
                  finalPaymentDeterminationStatus ='all_paid'
                  break;
                case 'somePaid':
                  finalPaymentDeterminationStatus ='some_paid'
                  break;
                case 'noConfirm':
                  finalPaymentDeterminationStatus ='not_confirm'
                  break;
  
            }
            qs += `&paymentDeterminationStatus=${finalPaymentDeterminationStatus}`;
          }
  
          if(healthType){
            qs += `&healthType=${healthType}`;
          }
  
          if(query){
            qs += `&query=${query}`;
          }
  
          if(activeTask){
            qs += `&activeTask=${activeTask}`
          }
  
          // Actually perform search
          const { results = [], numberOfResults = 0, updatePermission = false, } = (await AxiosPrivate.get(`/api/v2/assessment-portal/search?${qs}`)).data;
          handleSetTableData(results, numberOfResults, page, updatePermission);
        } catch (e) {
          openToast({ status: 'error', message: e.message || 'Failed to lookup' });
        } finally {
          setFetching(false);
        }
      })();
    }, [history.location.search]);
  
    return {
      onSubmit: ({ fromDate, toDate, submissionDate, submissionStatus, paymentStatus, paymentDeterminationStatus, agent, healthType, orderBy, query, activeTask }) => {
        if (fromDate) fromDate = validDateOrEmpty(fromDate);
        if (toDate) toDate = validDateOrEmpty(toDate);
        if (submissionDate) submissionDate = validDateOrEmpty(submissionDate);
  
        return setOptionalURLParams(history, {
          page: 0,
          ...(fromDate ? { fromDate } : {}),
          ...(toDate ? { toDate } : {}),
          ...(submissionDate ? { submissionDate } : {}),
          ...(submissionStatus ? { submissionStatus } : {}),
          ...(paymentStatus ? { paymentStatus } : {}),
          ...(paymentDeterminationStatus ? { paymentDeterminationStatus } : {}),
          ...(agent ? { agent } : {}),
          ...(healthType ? { healthType } : {}),
          ...(orderBy ? { orderBy } : {}),
          ...(query ? { query } : {}),
          ...(activeTask? {activeTask}: {})
        })
      },
      onSearch: (query) => setOptionalURLParams(history, { query, page: 0 }),
      onFilter: (filter) => setOptionalURLParams(history, { filter, page: 0 }),
      onAgent: (agent) => setOptionalURLParams(history, { agent, page: 0 }),
      onSort: (orderBy, order) => setOptionalURLParams(history, { orderBy, order, page: 0 }),
      onChangePage: (page) => setOptionalURLParams(history, { page }),
      clearFilter: (filter) => removeOptionalURLParam(history, filter),
      tableData,
      isFetching,
      selectedSearchFilters,
      zeroStates,
    };
  };