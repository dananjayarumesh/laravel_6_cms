<?php

namespace Modules\Menu\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Menu extends Model
{
	use SoftDeletes;

	protected $fillable = ['title','menu_icon_id','url','route_type','parent_id','level','priority'];

	public function icon()
	{
		return $this->belongsTo('Modules\Menu\Entities\MenuIcon','menu_icon_id','id');
	}

	public function parent()
	{
		return $this->belongsTo('Modules\Menu\Entities\Menu','parent_id','id');
	}

	private function checkPermission($permissions,$super_admin_only = 0)
	{
		if(!\Auth::check()){
			return false;
		}

		$user = \Auth::guard('admin')->user();

		if($super_admin_only == 1 && $user->id == 1){
			return true;
		}else if($super_admin_only == 1){
			return false;
		}

		if(($user->id == 1) || (trim($permissions) == "" || trim($permissions) == NULL) ){
			return true;
		}else{

			$permissions = $permissions ? explode(',', $permissions) : '';
			if($user){
				return $user->hasAnyPermission($permissions);
			}else{
				return false;
			}
		}


	}

	public function loadMenu()
	{
		$l1_items = $this->whereNull('parent_id')->whereStatus(1)->orderBy('priority')->get();

		foreach ($l1_items as $key => $l1_item) {

			if(!$this->checkPermission($l1_item->permissions,$l1_item->super_admin)){
				continue;
			}

			$l2_items = $this->whereParentId($l1_item->id)->whereStatus(1)->orderBy('priority')->get();

			$l2_items_dom = '';
			$l3_items = array();
			$l1_active_urls = array();
			foreach ($l2_items as $key => $l2_item) {

				if(!$this->checkPermission($l2_item->permissions,$l2_item->super_admin)){
					continue;
				}


				$l3_items = $this->whereParentId($l2_item->id)->whereStatus(1)->orderBy('priority')->get();

				$l2_active_urls = array();
				$l3_items_dom = '';
				foreach ($l3_items as $key => $l3_item) {

					if(!$this->checkPermission($l3_item->permissions,$l3_item->super_admin)){
						continue;
					}

					$l3_active = \Request::is($l3_item->url) ? 'active menu-open' : '';

					$l3_items_dom .= '<li class="'.$l3_active.'"><a href="'.url('admin/'.$l3_item->url).'"><i class="fa '.$l3_item->icon->icon_class.'"></i> '.$l3_item->title.'</a></li>';
					$l2_active_urls[] = 'admin/'.$l3_item->url;
				}

				$l2_active_urls[] = 'admin/'.$l2_item->url;

				$l2_active = \Request::is($l2_active_urls) ? 'active menu-open' : '';

				if($l3_items->count() == 0){
					$l2_items_dom .= '<li class="'.$l2_active.'"><a href="'.url('admin/'.$l2_item->url).'"><i class="fa fa-circle-o"></i> '.$l2_item->title.'</a></li>';
				}else{

					$l2_items_dom .= '<li class="treeview '.$l2_active.'">
					<a href="#">
					<i class="fa '.$l2_item->icon->icon_class.'"></i> '.$l2_item->title.'
					<span class="pull-right-container">
					<i class="fa fa-angle-left pull-right"></i>
					</span>
					</a>
					<ul class="treeview-menu">
					'.$l3_items_dom.'
					</ul>
					</li>';
				}

				// foreach ($l3_items as $key => $l3_item) {

				// 	$l3_active = \Request::is($l2_active_urls) ? 'active menu-open' : '';

				// 	$l3_items_dom .= '<li class="'.$l3_active.'"><a href="{{url('.$l3_item->url.')}}"><i class="fa fa-circle-o"></i> '.$l3_item->title.'</a></li>';
				// }
				$l1_active_urls = array_merge($l1_active_urls,$l2_active_urls);
			}

			$l1_active_urls[] = 'admin/'.$l1_item->url;

			$l1_active = \Request::is($l1_active_urls) ? 'active menu-open' : '';

			if($l2_items->count() == 0){

				echo '<li class="'.$l1_active.'">
				<a href="'.url('admin/'.$l1_item->url).'">
				<i class="fa '.$l1_item->icon->icon_class.'"></i>
				<span>'.$l1_item->title.'</span>
				</a>
				</li>';

			}else{

				echo '<li class="treeview '.$l1_active.'">
				<a href="#">
				<i class="fa '.$l1_item->icon->icon_class.'"></i>
				<span>'.$l1_item->title .'</span>
				<span class="pull-right-container">
				<i class="fa fa-angle-left pull-right"></i>
				</span>
				</a>
				<ul class="treeview-menu">
				'.$l2_items_dom.'
				</ul>
				</li>';

			}
		}

	}
}
