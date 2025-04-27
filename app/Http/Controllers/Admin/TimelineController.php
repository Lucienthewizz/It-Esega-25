<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TimelineRequest;
use App\Http\Resources\TimelineResource;
use App\Models\Timeline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class TimelineController extends Controller
{
    public function index()
    {
        $timelines = Timeline::latest()->paginate(10);

        return Inertia::render('admin/timeline/index', [
            'timelines' => TimelineResource::collection($timelines),
        ]);
    }

    public function store(TimelineRequest $request)
    {
        $validated = $request->validated();

        Timeline::create($validated);

        Session::flash('success', "Timeline berhasil ditambahkan.");
        return to_route('timeline.index');
    }

    public function update(TimelineRequest $request, $id)
    {
        $timeline = Timeline::findOrFail($id);

        $validated = $request->validated();

        $timeline->update($validated);

        Session::flash('success', "Timeline berhasil diperbaharui.");
        return to_route('timeline.index');
    }

    public function destroy($id)
    {
        $timeline = Timeline::findOrFail($id);

        $timeline->delete();

        Session::flash('success', "Timeline berhasil dihapus.");
        return to_route('timeline.index');
    }
}
