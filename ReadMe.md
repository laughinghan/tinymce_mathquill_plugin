# TinyMCE MathQuill Plugin

by [Ian][] and [Han][].

[Ian]: http://github.com/jungziege
[Han]: http://github.com/laughinghan

Updated by [Dylan][] to TinyMce 4.5.5 and MathQuill v0.10.1.

[Dylan]: https://github.com/dylandhall

This is a [TinyMCE][] plugin to let you use [MathQuill][] to edit equations
that are rendered as images. The actual plugin is in
`vendor/tinymce/jscripts/tiny_mce/plugins/mathquill`.

[TinyMCE]: http://www.tinymce.com
[MathQuill]: http://mathquill.com

Please note that this is a beta version, so bugs and unimplemented features
are all over the place.

### Development Notes

MathQuill's sources are included in the repo as a submodule, whenever it
changes you must run `make` to build the sources so the plugin, as included in
`demo.html`, can use it. (If `make` isn't working, try `make clean && make`.)

If you don't know how submodules work, the quick-and-dirty is that when you
`git clone` or `git pull`, you should run `git submodule update --init`, and
when you change anything in the submodule, you MUST commit the change to the
**OUTER** repo (which requires committing within the submodule first) BEFORE
you next run `git submodule update`, because it discards changes to
submodules. You should also read [more about submodules][submodules].

[submodules]: http://git-scm.com/book/en/Git-Tools-Submodules

Finally, many browsers restrict `file://`-protocol pages within iframes from
communicating with container pages (for good reason), so for `demo.html` to
work you may have to run `python -m SimpleHTTPServer` and visit
`http://localhost:8000/demo.html` (or do something equivalent).

## Open-Source License

[GNU Lesser General Public License](http://www.gnu.org/licenses/lgpl.html)

Copyleft 2012 [Ian](http://github.com/jungziege) and [Han](http://github.com/laughinghan)
