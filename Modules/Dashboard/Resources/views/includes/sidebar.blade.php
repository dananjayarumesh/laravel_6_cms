 
<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">
    <!-- Sidebar user panel -->

    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu" data-widget="tree">
      <li class="header">MAIN NAVIGATION</li>

    
      @php
      $menu = new Modules\Menu\Entities\Menu();
      echo $menu->loadMenu();
      @endphp
  
      {{-- <li class="header">MAIN NAVIGATION</li> --}}
      
    {{--   <li>
        <a href="{{url('/')}}">
          <i class="fa fa-dashboard"></i> <span>Dashboard</span>
        </a>
      </li>

      <li class="treeview">
        <a href="#">
          <i class="fa fa-pie-chart"></i>
          <span>Stock</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="{{url('stock-summary')}}"><i class="fa fa-circle-o"></i> Summary</a></li>
          <li><a href="{{url('supplier')}}"><i class="fa fa-circle-o"></i> Supplier</a></li>
          <li><a href="{{url('stock-type')}}"><i class="fa fa-circle-o"></i> Stock Type</a></li>
          <li><a href="{{url('stock-item')}}"><i class="fa fa-circle-o"></i> Stock Item</a></li>
          <li><a href="{{url('grn')}}"><i class="fa fa-circle-o"></i> GRN</a></li>
          <li><a href="{{url('gdn')}}"><i class="fa fa-circle-o"></i> GDN</a></li>
          <li><a href="{{url('grn-return')}}"><i class="fa fa-circle-o"></i> GRN Returns</a></li>
        </ul>
      </li> --}}
       {{--  <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Process Type</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{url('processtype')}}"><i class="fa fa-circle-o"></i>Main Process</a></li>
          </ul>
        </li> --}}

        {{--   <li>
          <a href="{{route('operation-lineup.index')}}">
            <i class="fa fa-pie-chart"></i> <span>Operation Lineups</span>
          </a>
        </li> --}}

{{--         <li>
          <a href="{{route('operation-run.index')}}">
            <i class="fa fa-pie-chart"></i> <span>Operation Runs</span>
          </a>
        </li>
        --}}
       {{--  <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Operation Runs</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{route('operation-run.index')}}"><i class="fa fa-circle-o"></i>Operation Runs</a></li>
            <li class="treeview">
              <a href="#"><i class="fa fa-circle-o"></i> Operation Logs
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li><a href="{{url('operation-run-feed/machine-logs')}}"><i class="fa fa-circle-o"></i> Machine</a></li>
                <li><a href="{{url('operation-run-feed/lobor-logs')}}"><i class="fa fa-circle-o"></i> Labor</a></li>
                <li><a href="{{url('operation-run-feed/production-logs')}}"><i class="fa fa-circle-o"></i> Production</a></li>
                <li><a href="{{url('operation-run-feed/production-repair-logs')}}"><i class="fa fa-circle-o"></i> Production Repair</a></li>
              </ul>
            </li>
          </ul>
        </li>
 --}}
       {{--  <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Machines</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{route('machine.summary')}}"><i class="fa fa-circle-o"></i>Summary</a></li>
            <li><a href="{{route('machine.index')}}"><i class="fa fa-circle-o"></i>Machines</a></li>
          </ul>
        </li> --}}

    {{--     <li>
          <a href="{{route('machine.index')}}">
            <i class="fa fa-pie-chart"></i> <span>Machines</span>
          </a>
        </li> --}}

       {{--  <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Process Management</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{url('processmanagement')}}"><i class="fa fa-circle-o"></i> Process List</a></li>
            <li><a href="{{url('processmanagement/create')}}"><i class="fa fa-circle-o"></i> Process Add</a></li>
          </ul>
        </li> --}}

        {{-- <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Processes</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
              <li class="treeview">
                <a href="#"><i class="fa fa-circle-o"></i> Main Processes (Sections)
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="{{route('main-process.index')}}"><i class="fa fa-circle-o"></i>Level 1</a></li>
                  <li><a href="{{route('main-sub-process.index')}}"><i class="fa fa-circle-o"></i>Level 2</a></li>                 
                </ul>
              </li>
              <li class="treeview">
                <a href="#"><i class="fa fa-circle-o"></i> Sub Processes
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="{{route('sub-process.index')}}"><i class="fa fa-circle-o"></i>Level 1</a></li>
                  <li><a href="{{route('sub-section-process.index')}}"><i class="fa fa-circle-o"></i>Level 2</a></li>                 
                </ul>
              </li>                     
          </ul>
        </li> --}}
        
      {{--   <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Labors</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{route('labor.summary')}}"><i class="fa fa-circle-o"></i>Summary</a></li>
            <li><a href="{{route('company.index')}}"><i class="fa fa-circle-o"></i> <span>Company</span></a></li>
            <li><a href="{{route('inhouse-labor.index')}}"><i class="fa fa-circle-o"></i>Inhouse Labor</a></li>
            <li><a href="{{route('manpower-labor.index')}}"><i class="fa fa-circle-o"></i>Manpower Labor</a></li>
            <li><a href="{{route('pay-roll.index')}}"><i class="fa fa-circle-o"></i>Pay roll</a></li>
          </ul>
        </li> --}}

      {{--   <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Inhouse Labor</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{url('inhouselabor')}}"><i class="fa fa-circle-o"></i> Inhouse Labor List</a></li>
            <li><a href="{{url('inhouselabor/create')}}"><i class="fa fa-circle-o"></i> Inhouse Labor Add</a></li>
          </ul>
        </li> --}}

    {{--     <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Manpower Labor</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{url('manpowerlabor')}}"><i class="fa fa-circle-o"></i> Manpower Labor List</a></li>
            <li><a href="{{url('manpowerlabor/create')}}"><i class="fa fa-circle-o"></i> Manpower Labor Add</a></li>
          </ul>
        </li> --}}

{{--         <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Machines</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{url('machine')}}"><i class="fa fa-circle-o"></i> Machine Add</a></li>
            <li><a href="{{url('machine/summary')}}"><i class="fa fa-circle-o"></i> Machine Summary</a></li>
          </ul>
        </li> --}}

{{--         <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Reports</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href=""><i class="fa fa-circle-o"></i> Profit & Loss</a></li>
            <li><a href=""><i class="fa fa-circle-o"></i> Work Summary Report</a></li>
            <li><a href=""><i class="fa fa-circle-o"></i> Stock</a></li>
            <li><a href=""><i class="fa fa-circle-o"></i> Trial Balance</a></li>
          </ul>
        </li> --}}

        {{--<li>
          <a href="{{url('stocktype')}}">
            <i class="fa fa-bitbucket"></i> <span>Stock Type</span>
          </a>   
        </li>
        <li>
          <a href="{{url('stockitem')}}">
            <i class="fa fa-bitbucket"></i> <span>Stock Item</span>
          </a>   
        </li>--}}

      {{--   <li>
          <a href="{{route('client.index')}}">
            <i class="fa fa-dashboard"></i> <span>Clients</span>
          </a>
          
        </li>

        <li>
          <a href="{{route('service.index')}}">
            <i class="fa fa-dashboard"></i> <span>Services</span>
          </a>
        </li>

        <li>
          <a href="{{route('payment.index')}}">
            <i class="fa fa-dashboard"></i> <span>Payments</span>
          </a>
          
        </li>

        <li>
          <a href="{{route('payment.index')}}">
            <i class="fa fa-dashboard"></i> <span>Email Log</span>
          </a>

        </li> --}}

{{-- 
        <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Books</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{route('book.index')}}"><i class="fa fa-circle-o"></i>Book</a></li>
            <li><a href="{{route('booktype.index')}}"><i class="fa fa-circle-o"></i>Book Type</a></li>
          </ul>
        </li> --}}

        {{-- <li>
          <a href="{{route('company.index')}}">
            <i class="fa fa-dashboard"></i> <span>Companies</span>
          </a>
        </li> --}}
{{-- 
        <li>
          <a href="{{route('user.index')}}">
            <i class="fa fa-dashboard"></i> <span>Users</span>
          </a>
        </li>

        <li>
          <a href="{{route('role.index')}}">
            <i class="fa fa-dashboard"></i> <span>Roles</span>
          </a>
        </li>

        <li>
          <a href="{{route('permission.index')}}">
            <i class="fa fa-dashboard"></i> <span>Permissions</span>
          </a>
        </li> --}}

       {{-- <li>
          <a href="{{url('userpermission')}}">
            <i class="fa fa-dashboard"></i> <span>User Permissions</span>
          </a>
        </li>
        <li>
          <a href="{{url('rolepermission')}}">
            <i class="fa fa-dashboard"></i> <span>Role Permissions</span>
          </a>
        </li>--}}
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
